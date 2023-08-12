import { Box, Heading, Skeleton } from '@chakra-ui/react';
import { Row } from 'antd';
import dynamic from 'next/dynamic'
const NewItemSlider = dynamic(() => import("@/component/index/new-item-slider"), {
    ssr: false,
    loading: () => <NewItemSliderLoading />
}
);
const Hero = dynamic(() => import("@/component/index/hero"), { ssr: false });

export default function Index() {

    return (
        <>
            <Hero />
            <NewItemSlider />
        </>
    )
}

const NewItemSliderLoading = () => {
    return (
        <>
            <Skeleton rounded={'md'} w={'28'}>
                <Row className="flex gap-4 items-baseline mb-4 ">
                    <Heading size={"md"}>Lasted IC</Heading>
                </Row>
            </Skeleton>
            <Skeleton rounded={'md'}>
                <Box className='w-[240px] h-[271px]' />
            </Skeleton>
        </>
    )
}