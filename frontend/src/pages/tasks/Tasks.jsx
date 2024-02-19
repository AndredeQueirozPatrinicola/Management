import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'

import { toast } from "sonner"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from 'react'

import NavBar from '@/src/components/NavBar.jsx'

import authAPI from '@/src/api/authAPI.jsx'


export default function Tasks(){
    let api = authAPI(); 
    const [ cards, setCards ] = useState([])
    const [ newTaskData, setNewTaskData ] = useState({
        "name":  "",
        "description": ""
    })

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(()=>{
        const getData = async () => {
            const data = await api.get('api/tasks/').then(res => res.data)
            setCards(data)
        }
        getData()
        setNewTaskData({
            "name":  "",
            "description": ""
        })
    }, [openDialog])

    const handleNewTaskCardChange = (e) => {
        setNewTaskData({
            ...newTaskData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        const sendData = async () => {
            await api.post(
                'api/tasks/', 
                newTaskData
                )
                .then((res) => {
                    toast("Task has been created", {
                        description: `Task ${res.data.name} created successfully`,
                    })
                    setOpenDialog(false);
                    return res.data
                })
                .catch( (error) => {
                    console.log(error)
                    toast("Could not create task", {
                        description: `We had a problem while creating your task. Please try again.`,
                    })
                  })
        }
        sendData()
    }

    return (
        <div>
            <NavBar/>
            <div className='flex p-2'>
                <Card className='w-[18%] m-2'>
                    <CardHeader>
                        <CardTitle>Options</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger className="hover:underline">
                                <FontAwesomeIcon icon={faPencil} />Add Task    
                            </DialogTrigger>
                            <DialogContent>
                                <Card className="w-[98%]">
                                    <CardHeader>
                                        <CardTitle>Add Task</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form>
                                            <div className="grid w-full items-center gap-4">
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" placeholder="Name of your task" onChange={handleNewTaskCardChange} name='name'/>
                                                    {/* <span className='text-red-500 text-sm'><FontAwesomeIcon icon={faTriangleExclamation} />{}</span> */}
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="framework">Group</Label>
                                                    <Select>
                                                        <SelectTrigger id="framework">
                                                        <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent position="popper">
                                                        <SelectItem value="college">College</SelectItem>
                                                        <SelectItem value="work">Work</SelectItem>
                                                        <SelectItem value="bills">Bills</SelectItem>
                                                        <SelectItem value="other">Other...</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="description">Description</Label>
                                                    <Textarea onChange={handleNewTaskCardChange} name='description'/>
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            onClick={handleSubmit}
                                        >Deploy</Button>
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
                <Card className='w-[82%] m-2'>
                    <CardHeader>
                        <CardTitle>Tasks</CardTitle>
                        <CardDescription>Your next tasks are...</CardDescription>
                    </CardHeader>
                    <CardContent
                        className='flex flex-wrap justify-around'
                    >
                        {cards?.map((card, index)=>{
                            return (
                                <Card className="w-[20%] mx-1 my-2" key={index}>
                                    <CardHeader>
                                        <CardTitle>{card.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form>
                                            <div className="grid w-full items-center gap-4">
                                                <div className="flex flex-col space-y-1.5">
                                                    {card.name}
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    {card.description} 
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button>Detail</Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

