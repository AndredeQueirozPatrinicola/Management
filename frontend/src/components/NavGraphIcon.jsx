import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';


export default function NavGraphIcon() {
    return (
        <div className='min-w-10 flex justify-center items-center px-6 h-full'>
            <FontAwesomeIcon icon={faChartSimple} />
        </div>
    );
}