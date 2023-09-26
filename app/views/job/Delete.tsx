"use client";
import {useRouter} from 'next/navigation';
import {useState, useTransition} from "react";
import {BiTrashAlt} from "react-icons/bi";
import {Job} from "@/app/core/dto/Job";


export default function Delete(job: Job) {

    const [modal, setModal] = useState(false);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleChange() {
        setModal(!modal)
    }

    const [isMutating, setIsMutating] = useState(false);


    async function do_delete(id: number | null) {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/v1/jobs/${id}`, {
            method: "DELETE",
        });
    }

    function handleDelete(id: number | null) {
        console.log(job);
        do_delete(id).then(r => {
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
                <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete Job {job.id}?</h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                                <button type="button" className="btn btn-primary" onClick={() => handleDelete(job.id)}>
                                    Delete
                                </button>
                            ) :
                            <button type="button" className="btn loading">
                                Deleting...
                            </button>
                        }
                    </div>


                </div>
            </div>
        </div>
    );
}
