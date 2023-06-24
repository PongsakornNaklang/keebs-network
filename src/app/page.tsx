'use client'
import Banner from '@/component/banner'
import Footer from '@/component/footer'
import Navbar from '@/component/navbar'
import { Container} from '@chakra-ui/react'

export default function Home() {
  return (
    <Container maxW='full' h={'100vh'} p={0}>
      <Navbar />
      <Banner />
      <Footer />
    </Container>
  )
}
