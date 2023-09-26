"use client";
import {Job} from "@/app/core/dto/Job";
import {useState} from "react";
import {City} from "@/app/core/dto/City";

export default function CitiesDropDownView(job: Job) {

    const [modal, setModal] = useState(false);
    let cityList: City[] = [];

    async function handleChange() {
        setModal(!modal)
    }

    if (job.cities !== undefined) {
        cityList = job.cities;
    }

    return (
        <div>
            <button className="cursor" onClick={handleChange}>
                <span className={`${cityList[0] ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>
                  {cityList[0] ? "view" : "null"}
                </span>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal max-h-full">
                <div className="modal-box relative w-full max-w-md max-h-full">
                    <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
                            Cities
                        </h3>
                    </div>

                    <div className="p-6 ">
                        <ul className="max-w-md">

                            {cityList.map((city, index) => (
                                <li key={index} className="pb-3 sm:pb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 font-semibold truncate dark:text-white">
                                                {city.name}
                                            </p>
                                            <p className="text-gray-500 truncate dark:text-gray-400">
                                                {city.code}
                                            </p>
                                        </div>
                                        <div
                                            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {city.code}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="modal-action">
                        <button className="btn btn-primary" type="button" onClick={handleChange}>
                            Ok
                        </button>
                    </div>
                </div>

            </div>


        </div>
    );

}