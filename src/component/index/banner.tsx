import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Banner = () => {
    const router = useRouter()
    const purpleColor = useColorModeValue("purple.500", "purple.200");
    const tealColor = useColorModeValue("teal.500", "teal.200");
    const textColor = useColorModeValue("white", "#1a202c");
    const textDescColor = useColorModeValue("white", "#1a202c");

    return (
        <>
            <Card align='start' mb={4} bgGradient={`linear(to-r, ${purpleColor}, ${tealColor})`}>
                <CardHeader>
                    <Heading color={textColor}>Welcome to Keebs Network! 🤓</Heading>
                </CardHeader>
                <CardBody>
                    <Text fontSize='xl' color={textDescColor}>Discover, share, and create your dream custom keyboards with our vibrant community. ⌨️</Text>
                    <Text fontSize='xl' color={textDescColor}>Join now and let's elevate the world of mechanical keyboards together! ✨</Text>
                </CardBody>
                <CardFooter className="gap-2">
                    <Button colorScheme="cyan" textColor={textColor} onClick={() => router.push("/ic")}>View IC</Button>
                    <Button colorScheme="cyan" textColor={textColor} >View GB</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default Banner