

export default function TaskCardInfos( props ) {
    return (
        <div>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    {props.group}
                </div>
                <div className="flex flex-col space-y-1.5">
                    {props.description} 
                </div>
            </div>
        </div>
    );
}