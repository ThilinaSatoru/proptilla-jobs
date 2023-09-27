"use client";
import {Job} from "@/app/core/dto/Job";
import {useState} from "react";

export default function ConnectorDropDownView(job: Job) {

    const [modal, setModal] = useState(false);

    async function handleChange() {
        setModal(!modal)
    }

    // @ts-ignore
    return (
        <div>
            <button className="cursor" onClick={handleChange}>
                <span
                    className={`${job.agent?.refNo ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>
                  {job.agent?.refNo ? job.agent?.refNo : "null"}
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
                            Website
                        </h3>
                    </div>

                    <div className="p-6 ">
                        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-15 h-15 rounded-full"
                                             src={job.agent?.logo} alt="logo"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {job.agent?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {job.agent?.url}
                                        </p>
                                    </div>
                                    <div
                                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {job.agent?.refNo}
                                    </div>
                                </div>
                            </li>
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