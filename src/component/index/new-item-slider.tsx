import { Stack, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import ProductCard from "../product-card";
import { useProduct } from "@/hook/useProduct";
import { useEffect, useState } from "react";

const NewItemSlider = () => {
    const { products } = useProduct();
    const [slidesToShow, setSlidesToShow] = useState(5);

    useEffect(() => {
        const calculateSlidesToShow = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                setSlidesToShow(1);
            } else if (screenWidth < 768) {
                setSlidesToShow(2);
            } else if (screenWidth < 1024) {
                setSlidesToShow(3);
            } else if (screenWidth < 1280) {
                setSlidesToShow(4);
            } else {
                setSlidesToShow(5);
            }
        };

        calculateSlidesToShow();
        window.addEventListener("resize", calculateSlidesToShow);

        return () => {
            window.removeEventListener("resize", calculateSlidesToShow);
        };
    }, []);

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        vertical: false,
        useCSS: true,
    };

    return (
        <>
            <Stack>
                <Text>New</Text>
            </Stack>
            <Slider {...settings}>
                {products.map((product, index) => (
                    <ProductCard {...product} />
                ))}
            </Slider>
        </>
    )
}

export default NewItemSlider;