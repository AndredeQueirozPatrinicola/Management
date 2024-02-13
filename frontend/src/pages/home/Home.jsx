import { useContext } from 'react'
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { NavLink } from 'react-router-dom'

import { AuthContext } from "../../context/AuthContext.jsx"


export default function Home(){
    
    const { userData } = useContext( AuthContext );
    
    return (
        <div>

            <h3 className="text-start text-4xl text-secondary-foreground font-normal mx-5 my-0 border-b-2 border-b-secondary-foreground">
                Bem-vindo {userData.email?.split('@')[0]}
            </h3>
            
            <div className="mt-16 flex flex-row items-center justify-evenly">
                <div className="p-1">
                    <NavLink to="/">
                        <Card className="bg-foreground text-secondary p-2">
                            <CardTitle>
                                Estacionamentos 
                            </CardTitle>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <i className="fas fa-parking text-9xl"></i>
                            </CardContent>
                        </Card>
                    </NavLink>
                </div>

                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                            <Card className="bg-foreground text-secondary">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}