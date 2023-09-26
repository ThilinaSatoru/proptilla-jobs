"use client";
import {useRouter} from 'next/navigation';
import {useState, useTransition} from "react";
import {Job} from "@/app/core/dto/Job";


export default function Toggle(job: Job) {

    const [modal, setModal] = useState(false);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleChange() {
        setModal(!modal)
    }

    const [isMutating, setIsMutating] = useState(false);


    async function do_update(id: number | null) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/v1/jobs/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job),
        });
    }

    function handleUpdate() {
        console.log(job);
        job.active = !job.active;
        do_update(job.id).then(r => {
            startTransition(() => {
                // Refresh the current route and fetch new data from the server without
                // losing client-side browser or React state.
                router.refresh();
                setModal(false);
            });
        });
    }

    return (
        <div>
            <button className="cursor" onClick={handleChange}>
                <span className={`${job.active ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>
                  {job.active ? "Active" : "Off"}
                </span>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Status of {job.id}?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                    Ok
                                </button>
                            ) :
                            <button type="button" className="btn loading">
                                Updating...
                            </button>
                        }
                    </div>


                </div>
            </div>
        </div>
    );
}
