import Navbar from "./components/ui/Navbar"
import { Card, CardContent, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import "./Education.css"

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

const Education=()=>{
    return(
        <>
            <Navbar/>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Education</h1>
                </div>
            </header>
            <div className="edu-content">
                {educationDummy.map((item,index)=>(
                    <Card key={index} className="edu-card">
                        <CardContent className="edu-content-card">
                            <img src={item.image} alt={item.title} />
                            <CardTitle>{item.title}</CardTitle>
                            {item.description}
                            <Button className="button">Read More</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Education