import { Image } from "@chakra-ui/next-js"
import { Button, Card, CardBody, Heading, LinkBox, Stack, Tag, TagLabel, Text } from "@chakra-ui/react"
import { ShoppingCart, Heart } from "@phosphor-icons/react"

export interface ProductCardProps {
    key: React.Key
    title: string
    description: string
    price: number
    image: string
}

const ProductCard = (props: ProductCardProps) => {
    const { key, title, description, price, image } = props
    return (
        <LinkBox key={key} rounded='md' my={2} className="product-card">
            <Card maxW='60' borderRadius={"lg"}>
                <CardBody padding={0}>
                    <Image
                        src={image}
                        alt={title}
                        borderTopRadius='md'
                        width={60}
                        height={40}
                    />
                    <Stack mx='3' my='3' spacing='2'>
                        <Heading size='sm'>{title}</Heading>
                        <div className="flex flex-row gap-1">
                            <Tag size='sm' colorScheme='purple' borderRadius='full'>
                                <TagLabel>case</TagLabel>
                            </Tag>
                            <Tag size='sm' colorScheme='red' borderRadius='full'>
                                <TagLabel>60%</TagLabel>
                            </Tag>
                            <Tag size='sm' colorScheme='green' borderRadius='full'>
                                <TagLabel>Aluminium</TagLabel>
                            </Tag>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <Text color='cyan.400' fontSize='md'>
                                {price} $
                            </Text>
                            <div>
                                <Button size={"sm"}>
                                    <Heart size={16} />
                                </Button>
                            </div>
                        </div>
                    </Stack>
                </CardBody>
            </Card>
        </LinkBox>
    )
}

export default ProductCard