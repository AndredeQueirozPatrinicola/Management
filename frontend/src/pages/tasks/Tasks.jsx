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
import Loader from '@/src/components/Loader';
import TaskCardInfos from '@/src/components/TaskCardInfos';

import authAPI from '@/src/api/authAPI.jsx'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 

export default function Tasks(){
    let api = authAPI(); 
    const [ cards, setCards ] = useState([])
    const [ groups, setGroups ] = useState([])
    const [ newItemData, setNewItemData ] = useState({
        "task" : {
            "name":  "",
            "description": "",
            "group": ""
        },
        "group": {
            "id": "",
            "group": ""
        }
    })

    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogGroup, setOpenDialogGroup] = useState(false);
    const [ cardData, setCardData ] = useState({})

    useEffect(()=>{
        const getData = async () => {
            const data = await api.get('api/tasks/').then(res => res.data)
            setCards(data)
        }
        getData()
        setNewItemData({
            ...newItemData,
            "task" : {
                "name":  "",
                "description": "",
                "group": ""
            }
        })
    }, [openDialog])

    useEffect(()=>{
        const getData = async () => {
            const data = await api.get('api/groups/').then(res => res.data)
            console.log(data)
            setGroups(data)
        }
        getData()
        setNewItemData({
            ...newItemData,
            "group" : {
                "id": "",
                "group":  "",
            }
        })
    }, [openDialogGroup])

    const handleOpenedCard = (e) => {
        const getData = async (e) => {
            await api.get(
                `api/tasks/${e.target.id}/`
            )
            .then((res) => {
                setCardData({
                    "id" : res.data.id,
                    "name": res.data.name,
                    "description": res.data.description
                })
            })  
            .catch(err => console.log(err))
        }
        setCardData({})
        getData(e);
    }

    const handleNewGroupCardChange = (e) => {
        setNewItemData({
            ...newItemData,
            "group" : {
                ...newItemData.group,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleNewTaskCardChange = (e) => {
        setNewItemData({
            ...newItemData,
            "task" : {
                ...newItemData.task,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleNewTaskCardDateChange = (e) => {
        const formattedDate = new Date(e).toISOString().split('T')[0];
        setNewItemData({
            ...newItemData,
            "task" : {
                ...newItemData.task,
                date: formattedDate
            }
        });
    }

    const handleNewTaskCardSelectChange = (e) => {
        setNewItemData({
            ...newItemData,
            "task" : {
                ...newItemData.task,
                group: e
            }
        });
    }

    const handleSubmit = (e) => {
        const baseRef = e.target.name;
        const sendData = async () => {
            await api.post(
                `api/${baseRef}s/`, 
                newItemData[baseRef]
                )
                .then((res) => {
                    toast(`${baseRef} has been created`, {
                        description: `${baseRef} ${res.data.name} created successfully`,
                    })
                    setOpenDialog(false);
                    return res.data
                })
                .catch( (error) => {
                    console.log(error)
                    toast(`Could not create ${baseRef}`, {
                        description: `We had a problem while creating your ${baseRef}. Please try again.`,
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
                    <CardContent className='flex flex-col'>
                        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                            <DialogTrigger className="flex flex-start mb-4 hover:underline">
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
                                                </div>
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="framework">Group</Label>
                                                    <Select name='group' onValueChange={handleNewTaskCardSelectChange}>
                                                        <SelectTrigger id="framework">
                                                            <SelectValue placeholder="Select"/>
                                                        </SelectTrigger>
                                                        <SelectContent position="popper">
                                                        {console.log(groups)}
                                                        {console.log('?')}
                                                        {
                                                            groups?.map((group, index)=>{
                                                                return (
                                                                    <SelectItem key={index} value={group.id}>{group.group}</SelectItem>
                                                                )
                                                            })
                                                        }
                                                        {/* <SelectItem value="10">College</SelectItem>
                                                        <SelectItem value="11">Work</SelectItem>
                                                        <SelectItem value="22">Bills</SelectItem>
                                                        <SelectItem value="33">Other...</SelectItem> */}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className='flex justify-evenly items-center'>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[280px] justify-start text-left font-normal",
                                                                !newItemData.task.date && "text-muted-foreground"
                                                            )}
                                                            >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {newItemData.task.date ? format(newItemData.task.date, "PPP") : <span>Pick a date</span>}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                            mode="single"
                                                            selected={newItemData.task.date}
                                                            onSelect={handleNewTaskCardDateChange}
                                                            initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Input id="time" placeholder="Hour..." onChange={handleNewTaskCardChange} name='time'/>
                                                    </div>
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
                                            name='task'
                                            onClick={handleSubmit}
                                        >Submit</Button>
                                    </CardFooter>
                                </Card>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={openDialogGroup} onOpenChange={setOpenDialogGroup}>
                            <DialogTrigger className="flex flex-start mb-4 hover:underline">
                                <FontAwesomeIcon icon={faPencil} />Add Group    
                            </DialogTrigger>
                            <DialogContent>
                                <Card className="w-[98%]">
                                    <CardHeader>
                                        <CardTitle>Add Group</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form>
                                            <div className="grid w-full items-center gap-4">
                                                <div className="flex flex-col space-y-1.5">
                                                    <Label htmlFor="name">Group Name</Label>
                                                    <Input id="name" placeholder="Name of your group" onChange={handleNewGroupCardChange} name='group'/>
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button
                                            name='group'
                                            onClick={handleSubmit}
                                        >Submit</Button>
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
                                        <TaskCardInfos
                                            name={card.name}
                                            description={card.description}
                                            date={card.date}
                                            time={card.time}
                                            group={card.group}
                                        />
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Dialog>
                                            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                                id={card.id}
                                                onClick={handleOpenedCard}
                                                >Detail 
                                            </DialogTrigger>
                                            <DialogContent>
                                                <Card className="w-[98%]">
                                                    <CardHeader>
                                                        <CardTitle>{card.name}</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                       {
                                                            cardData.id ? 
                                                            <TaskCardInfos
                                                                name={card.name}
                                                                description={card.description}
                                                                date={card.date}
                                                                time={card.time}
                                                                group={card.group}
                                                            /> :
                                                            <Loader/>
                                                       }
                                                    </CardContent>
                                                    <CardFooter className="flex justify-between">
                                                        <Button
                                                        >Deploy</Button>
                                                    </CardFooter>
                                                </Card>
                                            </DialogContent>
                                        </Dialog>
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

