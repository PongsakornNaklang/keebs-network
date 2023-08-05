import { Button, Checkbox, CheckboxGroup, FormControl, FormLabel, Heading, Input, InputGroup, InputRightAddon, Select, Stack, Text, VStack } from "@chakra-ui/react"
import { ArrowBendUpLeft, CloudArrowUp, Eye, FloppyDisk } from "@phosphor-icons/react"
import { Editor, EditorOptions, TinyMCEEditor } from "@tinymce/tinymce-react"
import { useRouter } from "next/router"
import { useRef, useState, useEffect } from "react"
import UploadImageWall from "@/component/upload-img"
import type { UploadFile } from 'antd/es/upload/interface';

type EditorOption = EditorOptions & {
    selector?: undefined
    target?: undefined
}

const colorOptions = [
    "Black",
    "Silver",
    "Beige",
    "White",
    "Grey",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Pink",
    "Yellow",
    "Orange",
    "Brown",
    "Rose-gold",
    "Transparent"
];

const plateMaterialOptions = [
    { value: "alu", label: "Aluminium" },
    { value: "fr4", label: "Fr4" },
    { value: "pc", label: "Polycarbonate" },
    { value: "pom", label: "POM" },
    { value: "cf", label: "Carbon Fiber" },
    { value: "brass", label: "Brass" },
    { value: "pp", label: "PP" },
    { value: "uhmwpe", label: "UHMWPE" },
    { value: "plateless", label: "plateless" }
];

const pcbOptions = [
    { value: "solder", label: "Solder" },
    { value: "hotswap", label: "Hotswap" },
    { value: "non-flexcut", label: "Non-flexcut" },
    { value: "flexcut", label: "Flexcut" },
    { value: "underglow ", label: "Underglow " },
];

const CreateIC = () => {
    const router = useRouter();
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        console.log(fileList);
    }, [fileList])

    const editerInit: EditorOption = {
        branding: false,
        height: 600,
        menubar: true,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        image_advtab: true,
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name'
    }

    return (
        <div>
            <Stack spacing={4}>
                <Stack className="flex md:flex-row lg:flex-row justify-between">
                    <div>
                        <Heading>New Interest Check</Heading>
                        <Text>Fill in the form to create a new Interest Check</Text>
                    </div>

                    <div className="flex gap-x-4">
                        <Button colorScheme="red" variant='solid' leftIcon={<ArrowBendUpLeft size={16} weight="fill" />} onClick={() => router.back()}>Back</Button>
                        <Button colorScheme="green" variant='solid' leftIcon={<FloppyDisk size={16} weight="fill" />}>Save Draft</Button>
                        <Button colorScheme="orange" variant='solid' leftIcon={<Eye size={16} weight="fill" />}>Preview</Button>
                        <Button colorScheme="purple" variant='solid' leftIcon={<CloudArrowUp size={16} weight="fill" />}> Publish</Button>
                    </div>
                </Stack>
                <Stack direction={"row"}>
                    <FormControl className="flex flex-col gap-6">
                        <div>
                            <FormLabel>Title</FormLabel>
                            <Input type='text' placeholder="IC Title" />
                        </div>
                        <div>
                            <FormLabel>Description</FormLabel>
                            <Editor
                                id="tiny-react_41687589761691220055355"
                                apiKey="ezepy3ilkryflhw1e0ky6zl4r42fmg4d2077bqosrzq66ixi"
                                init={editerInit}
                                onInit={(evt, editor) => editorRef.current = editor}
                            />
                        </div>
                        <div>
                            <FormLabel>Upload Images</FormLabel>
                            <UploadImageWall onChange={(files) => setFileList(files)} />
                        </div>
                        <div>
                            <Heading size={"md"} className="mb-4">Specifications</Heading>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                <div>
                                    <FormLabel>Form Factors</FormLabel>
                                    <Select>
                                        <option value="100%">Fullsize / 100%</option>
                                        <option value='1800'>1800</option>
                                        <option value='TKL'>TKL</option>
                                        <option value='75%'>75%</option>
                                        <option value='70%'>70%</option>
                                        <option value='65%'>65%</option>
                                        <option value='60%'>60%</option>
                                        <option value='50%'>50%</option>
                                        <option value='40%'>40%</option>
                                        <option value='Numpad'>Numpad</option>
                                    </Select>
                                </div>

                                <div>
                                    <FormLabel>Layouts support</FormLabel>
                                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                        <Checkbox colorScheme='red'>
                                            ISO
                                        </Checkbox>
                                        <Checkbox colorScheme='green'>
                                            ANSI
                                        </Checkbox>
                                    </Stack>
                                </div>

                                <div>
                                    <FormLabel>Mounting style</FormLabel>
                                    <Select>
                                        <option value="Top">Top Mount</option>
                                        <option value='O-ring'>O-ring Mount</option>
                                        <option value='Gasket'>Gasket Mount</option>
                                        <option value='Tray'>Tray Mount</option>
                                        <option value='Burger'>Burger mount </option>
                                        <option value='Plateless'>Plateless mount</option>
                                    </Select>
                                </div>

                                <div>
                                    <FormLabel>Materials Top</FormLabel>
                                    <Select>
                                        <option value="Aluminium">Aluminium</option>
                                        <option value='Polycarbonate'>Polycarbonate</option>
                                        <option value='Acrylic'>Acrylic</option>
                                        <option value='Stainless-steel'>Stainless-steel</option>
                                        <option value='Copper'>Copper</option>
                                        <option value='None'>None</option>
                                    </Select>
                                </div>

                                <div>
                                    <FormLabel>Materials Buttom</FormLabel>
                                    <Select>
                                        <option value="Aluminium">Aluminium</option>
                                        <option value='Polycarbonate'>Polycarbonate</option>
                                        <option value='Acrylic'>Acrylic</option>
                                        <option value='Stainless-steel'>Stainless-steel</option>
                                        <option value='Copper'>Copper</option>
                                        <option value='None'>None</option>
                                    </Select>
                                </div>

                                <div>
                                    <FormLabel>Materials Weight</FormLabel>
                                    <Select>
                                        <option value="Aluminium">Aluminium</option>
                                        <option value='Brass'>Brass</option>
                                        <option value='Polycarbonate'>Polycarbonate</option>
                                        <option value='Acrylic'>Acrylic</option>
                                        <option value='Stainless-steel'>Stainless-steel</option>
                                        <option value='Copper'>Copper</option>
                                        <option value='None'>None</option>
                                    </Select>
                                </div>

                                <div>
                                    <FormLabel>Typing angle</FormLabel>
                                    <Select>
                                        <option value="5">5 deg</option>
                                        <option value='6'>6 deg</option>
                                        <option value='7'>7 deg</option>
                                    </Select>
                                </div>

                                <div>
                                    <FormLabel>Front height</FormLabel>
                                    <InputGroup>
                                        <Input type='number' min={0} placeholder="Front height" />
                                        <InputRightAddon children='mm' />
                                    </InputGroup>
                                </div>

                                <div>
                                    <FormLabel>Dimensions</FormLabel>
                                    <InputGroup className="items-center">
                                        <Input type='number' min={0} placeholder="Width" />
                                        <InputRightAddon children='mm' />
                                        <Text className="mx-3"> X </Text>
                                        <Input type='number' min={0} placeholder="Length" />
                                        <InputRightAddon children='mm' />
                                    </InputGroup>
                                </div>

                                <div>
                                    <FormLabel>Weight</FormLabel>
                                    <InputGroup>
                                        <Input type='number' min={0} placeholder="Weight" />
                                        <InputRightAddon children='kg' />
                                    </InputGroup>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Heading size={"md"} className="mb-4">Options</Heading>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                                <div>
                                    <FormLabel>Case color</FormLabel>
                                    <CheckboxGroup colorScheme="teal">
                                        <Stack spacing={2} direction="column">
                                            {colorOptions.map((color, index) => (
                                                <Checkbox key={index} value={color}>
                                                    {color}
                                                </Checkbox>
                                            ))}
                                        </Stack>
                                    </CheckboxGroup>
                                </div>

                                <div>
                                    <FormLabel>Plate Material</FormLabel>
                                    <VStack spacing={2} align="start">
                                        {plateMaterialOptions.map((option) => (
                                            <Checkbox key={option.value} value={option.value}>
                                                {option.label}
                                            </Checkbox>
                                        ))}
                                    </VStack>
                                </div>


                                <div>
                                    <FormLabel>PCB</FormLabel>
                                    <VStack spacing={2} align="start">
                                        {pcbOptions.map((option) => (
                                            <Checkbox key={option.value} value={option.value}>
                                                {option.label}
                                            </Checkbox>
                                        ))}
                                    </VStack>
                                </div>

                            </div>
                        </div>
                    </FormControl>
                </Stack>
            </Stack>
        </div >
    )
}

export default CreateIC