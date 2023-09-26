"use client";
import Select from "react-select";
import {Option} from "@/app/core/dto/Option";

const servers: Option[] = [
    {value: process.env.NEXT_PUBLIC_API_URL + '', label: "COSMOFORGE"},
    {value: process.env.NEXT_PUBLIC_API_URL + '', label: "LOCAL"}
]

localStorage.setItem("server_url", servers[0].value);

export default function UrlSelector() {

    function handleServerSelect(selectedOption: any) {
        localStorage.setItem("server_url", selectedOption.value);
        console.log(localStorage.getItem("server_url"));
    }

    return (
        <div style={{width: '50em'}}>
            <form style={{width: '100%'}}>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0" style={{width: '30%'}}>
                        <div className="relative">
                            <Select
                                name="server"
                                id="server"
                                instanceId="server"
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                defaultInputValue={servers[0].value}
                                options={servers}
                                onChange={handleServerSelect}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0" style={{width: '70%'}}>
                        <h4 className="md:w-1/3 px-3 mb-6 md:mb-0">Zip</h4>
                    </div>
                </div>
            </form>
        </div>
    );
}