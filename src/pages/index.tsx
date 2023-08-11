import { Box, Skeleton } from '@chakra-ui/react';
import dynamic from 'next/dynamic'
const NewItemSlider = dynamic(() => import("@/component/index/new-item-slider"), {
    ssr: false,
    loading: () => <Skeleton><Box className='rounded-md w-full h-[287px]' /></Skeleton>
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