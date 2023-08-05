import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Banner = () => {
    const router = useRouter()
    const purpleColor = useColorModeValue("purple.500", "purple.200");
    const tealColor = useColorModeValue("teal.500", "teal.200");
    const textColor = useColorModeValue("white", "white");

    return (
        <>
            <Card align='center' mb={4} bgGradient={`linear(to-r, ${purpleColor}, ${tealColor})`}>
                <CardHeader>
                    <Heading size='md' color={textColor}> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <Text color={textColor}>View a summary of all your customers over the last month.</Text>
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