import React from 'react';
import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Button,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { ArrowForwardIcon } from '@chakra-ui/icons';

// Settings for the slider
const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function Banner() {
    const [slider, setSlider] = React.useState<Slider | null>(null);

    const cards = [
        {
            title: `Let's build your keyboard! 🪛`,
            text:
                "A step-by-step guide for beginners, on how to build your first custom keyboard that looks, feels, and sounds nice.",
            image:
                'https://www.cherrymx.de/_Resources/Persistent/7/9/c/4/79c41487e0e423066df47b14fdba49117554a9fb/aufmacher.jpg',
            button: "Get start!",
        },
        {
            title: `Mechanical Keyboard Hobby's Library 🤓`,
            text:
                "A treasure trove of knowledge, resources, and inspiration for anyone passionate about the art and science of mechanical keyboards.",
            image:
                'https://www.alexotos.com/wp-content/uploads/2019/08/DSCF2481.jpg',
            button: "Let's check it",
        },
        {
            title: 'Custom Keyboard Projects ⌨️',
            text:
                "Collect the interest check and group buy projects for the Mechanical keyboard hobby.",
            image:
                'https://images.squarespace-cdn.com/content/v1/5f45fc75e970ce77721e4c31/1652029964184-3IPIFGW1WAR1BRQP1H3H/YT-Thumbnail-Keyboard-Collection_004.jpg',
            button: "Let's check it",
        },
        {
            title: 'The Community 👨‍🦲🧔‍♀️🧔🧔‍♂️',
            text:
                "A vibrant and inclusive gathering place for keyboard enthusiasts from all walks of life! This dynamic community serves as a hub for passionate individuals who appreciate the art, craftsmanship, and sheer joy of mechanical keyboards.",
            image:
                'https://nyckeyboardmeetup.com/static/images/events/20220917/DSC05856.jpg',
            button: "Let's check it",
        },

    ];

    return (
        <Box
            position={'relative'}
            height={'full'}
            width={'full'}
            overflow={'hidden'}
        >
            <link
                rel="stylesheet"
                type="text/css"
                charSet="UTF-8"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                {cards.map((card, i) => (
                    <Box
                        key={i}
                        height={'fit-content'}
                        position="relative"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundImage={`url(${card.image})`}
                        backgroundColor={'black'}
                        boxShadow="inset 1000px 1000px 1000px rgba(0, 0, 0, 0.3)"
                        opacity={1}
                    >
                        <Container size="container.lg" height={{ base: "100vh" }} position="relative">
                            <Stack
                                spacing={6}
                                w={'full'}
                                maxW={'lg'}
                                position="absolute"
                                top="50%"
                                transform="translate(0, -50%)"
                                zIndex={99}
                            >
                                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} color='white'>
                                    {card.title}
                                </Heading>
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color="whiteAlpha.800" >
                                    {card.text}
                                </Text>

                                {card.button ? <Button rightIcon={<ArrowForwardIcon />} colorScheme='whiteAlpha' w={'fit-content'}  > {card.button}</Button> : null}
                            </Stack>
                        </Container>
                    </Box>
                ))
                }
            </Slider >
        </Box >
    );
}