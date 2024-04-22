import './Dashboard.css'
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import TableDemo from "./components/ui/DashboardTable"
import Navbar from './components/ui/Navbar';

export function CarouselDashboard() {
  return (
    <Carousel className="carousel shadow-lg">
      <CarouselContent>
        {educationDummy.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="carousel-card">
                <CardContent className=" carousel-content p-6">
                  <img src={item.image} alt={item.title} className='gambar'/>
                  <CardTitle className='judul'>{item.title}</CardTitle>
                  {item.description}
                </CardContent>
                <Button>Read More</Button>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

const educationDummy=[
  {
    title: "Lorem ipsum dolor sit amet" ,
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque accusantium sed, quibusdam natus doloremque officiis consequatur blanditiis, quidem rerum nostrum minima saepe beatae unde aliquam at inventore tempora ut a voluptas, est tempore veritatis dolor voluptatem dolores. Eos, nam laudantium.
        </p>
      </>
    ),
    image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Lorem ipsum dolor sit amet" ,
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque accusantium sed, quibusdam natus doloremque officiis consequatur blanditiis, quidem rerum nostrum minima saepe beatae unde aliquam at inventore tempora ut a voluptas, est tempore veritatis dolor voluptatem dolores. Eos, nam laudantium.
        </p>
      </>
    ),
    image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Lorem ipsum dolor sit amet" ,
    description: (
      <>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque accusantium sed, quibusdam natus doloremque officiis consequatur blanditiis, quidem rerum nostrum minima saepe beatae unde aliquam at inventore tempora ut a voluptas, est tempore veritatis dolor voluptatem dolores. Eos, nam laudantium.
        </p>
      </>
    ),
    image:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export default function Dashboard() {
  return (
    <>
      <div className="min-h-full">
        <Navbar/>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="content flex-col md:flex-row">
            <div className='kiri'>
              <div className="price">
                <Card className="current-price shadow-lg">
                  <CardHeader>
                    <CardTitle>Current Price</CardTitle>
                    <CardDescription>from March 2024</CardDescription>
                    <CardContent>
                      <h1>Rp 150.000</h1>
                    </CardContent>
                  </CardHeader>
                </Card>
                <Card className="predict-price shadow-lg">
                  <CardHeader>
                    <CardTitle>Predict Price</CardTitle>
                    <CardDescription>On April 2024</CardDescription>
                    <CardContent>
                      <h1>Rp 160.000</h1>
                    </CardContent>
                  </CardHeader>
                </Card>
              </div>
              <div className="education">
                {/* <Card className="education-card shadow-lg">
                </Card> */}
                <CarouselDashboard/>
              </div>
            </div>
            <div className="kanan">
              <Card className="history shadow-lg">
                <CardContent>
                  <TableDemo/>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
