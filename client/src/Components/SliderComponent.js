import { useRef, useState } from "react";
import './SliderComponent.css'
import {IconButton} from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Photos = [
    "beach",
    "space",
    "office",
    "house",
    "shops",
    "hat",
    "park",
    "food",
    "club",
    "dance",
    "sun",
    "stars",
    "friends",
    "bank",
    "laptop",
    "book",
    "table",
    "mountain",
    "school",
    "watch",
    "bag",
    "family",
    "shops",
    "forrest",
    "city",
    "bus",
    "clock",
    "train",
    "bottle"
]

const SliderComponent = ({items}) => {
    const elementRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState(true);
    const unsplashed = "https://source.unsplash.com/200x200/";

    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };

    return (
        <>
            <div class="flex relative justify-between space-x-4 mt-[-30px]">
                <IconButton
                    className="absolute top-20 left-0"
                    onClick={() => {
                        handleHorizantalScroll(elementRef.current, 10, 250, -10);
                    }}
                    disabled={arrowDisable}
                >
                    <KeyboardArrowLeftIcon/>
                </IconButton>
                <IconButton
                className="absolute top-20 right-0"
                    onClick={() => {
                        handleHorizantalScroll(elementRef.current, 10, 250, 10);
                    }}
                >
                    <KeyboardArrowRightIcon/>
                </IconButton>
            </div>
            <div class="flex overflow-x-hidden w-[100%]" ref={elementRef}>
                {items.map((item, i) => (
                    <div className="flex w-[300px] border rounded-md ml-4">
                        <div className="w-[200px] rounded-lg p-4">
                            <img
                                className="w-[100px] h-[100px]"
                                key={i}
                                loading="lazy"
                                src={item.productId.itemPicture}
                            />
                        </div>
                        <div className="w-[200px] py-4">
                            <p className="font-bold">{item.productId.productName}</p>
                            <p>{item.quantity}x=Rs.{item.quantity * item.productId.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default SliderComponent;
