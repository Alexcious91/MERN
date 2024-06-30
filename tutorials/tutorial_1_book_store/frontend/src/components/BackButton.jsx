import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

function BackButton({ destination = "/" }) {
	return (
		<div className="flex">
			<Link to={destination} className="text-white bg-blue-700 px-4 py-1 rounded-lg w-fit">
            <BsArrowLeft className="text-2xl" />
         </Link>
		</div>
	);
}

export default BackButton;
