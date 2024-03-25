import { format } from "date-fns"

export default function TaskCardInfos( props ) {
    return (
        <div>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <div>
                        {props.group}
                    </div>
                    <div>
                        {format(props.date, "PPP")} : {props.time}
                    </div>
                </div>
                <div className="flex flex-col space-y-1.5 truncate">
                    {props.description} 
                </div>
            </div>
        </div>
    );
}