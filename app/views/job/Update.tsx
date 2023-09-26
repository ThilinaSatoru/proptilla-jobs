"use client";
import Select from "react-select";
import {useRouter} from 'next/navigation';
import useSWR from 'swr';
import {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState, useTransition} from "react";
import {City} from "@/app/core/dto/City";
import {Option} from "@/app/core/dto/Option";
import {Website} from "@/app/core/dto/Website";
import {BiEdit} from "react-icons/bi";
import {Job} from "@/app/core/dto/Job";

const connectorOptions: Option[] = [];
const cityOptions: Option[] = [];

const job_classes: Option[] = [
    {value: "AGENT", label: "AGENT"},
    {value: "PROPERTY", label: "PROPERTY"}
];

export default function Update(job: Job) {

    const [modal, setModal] = useState(false);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    async function handleChange() {
        setModal(!modal)
        if (!modal) {
            clearJobState();
        }
    }

    const [isSubmit, setSubmit] = useState(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data: cityData} = useSWR(process.env.NEXT_PUBLIC_API_URL + '/api/v1/cities', fetcher);
    const {data: conData} = useSWR(process.env.NEXT_PUBLIC_API_URL + '/api/v1/connectors', fetcher);

    const [isTrue, setIsTrue] = useState(true);
    const [cities, setCities] = useState<City[]>([]);
    const [websites, setWebsites] = useState<Website[]>([]);
    const [jobState, setJobState] = useState({
        id: "",
        name: "",
        jobClass: "",
        cron: "",
        active: false,
        createdOn: "",
        lastExecutedOn: "",
        website: new Website(null, "", "", "", "", ""),
        cities: [] as typeof City[],
    });
    const clearJobState = () => {
        setJobState({
            id: "",
            name: "",
            jobClass: "",
            cron: "",
            active: false,
            createdOn: "",
            lastExecutedOn: "",
            website: new Website(null, "", "", "", "READY", ""),
            cities: [] as typeof City[],
        });
    };

    const fetchCityOptions = useCallback(async () => {
        setCities([]);
        setWebsites([]);
        setCities(cityData as City[]);
        setWebsites(conData as Website[]);
    }, [cityData, conData]);
    useEffect(() => {
        fetchCityOptions().then(v => {
            if (cities) {
                cities.forEach(city => {
                    const newData: Option = {value: city.code, label: city.name};
                    cityOptions.push(newData)
                })
            }

            if (websites) {
                websites.forEach(con => {
                    const newData: Option = {value: con.refNo, label: con.refNo};
                    connectorOptions.push(newData)
                })
            }
        });
    }, [cities, fetchCityOptions, websites])

    const handleCitiesSelect = (selectedOption: any) => {
        let selected_cities: City[] = []
        selectedOption.forEach((selected: any) => {
            selected_cities.push(new City(null, selected.label, selected.value))
        })
        setJobState({
            ...jobState,
            cities: selected_cities as [],
        });
        console.log(selected_cities)
    };
    const handleJobClassSelect = (selectedOption: any) => {
        let label = selectedOption ? selectedOption.label : "";

        setJobState({
            ...jobState,
            jobClass: label,
        });

        console.log(selectedOption)
    };
    const handleWebsiteSelect = (selectedOption: any) => {
        let label = selectedOption ? selectedOption.label : "";

        setJobState({
            ...jobState,
            website: new Website(null, "", "", label, "READY", ""),
        });

        console.log(selectedOption)
    };
    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsTrue(e.target.value === 'true');
        setJobState({
            ...jobState,
            active: isTrue,
        });
    };
    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setJobState({
            ...jobState,
            [name]: value,
        });
        setSubmit(!isSubmit);
    };

    async function save() {
        await fetch("http://localhost:8081/api/v1/jobs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobState),
        });
        console.log(JSON.stringify(jobState))
    }

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        save().then(r => {
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
                <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
            </button>
            <input
                type="checkbox"
                checked={modal}
                onChange={handleChange}
                className="modal-toggle"
            />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Job</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="name" className="label font-bold">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={jobState.name}
                                onChange={handleFormChange}
                                className="input w-full input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="selectWarna" className="label font-bold">
                                Cities
                            </label>
                            <Select
                                id="selectWarna"
                                instanceId="selectWarna"
                                isMulti
                                name="colors"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={cityOptions}
                                onChange={handleCitiesSelect}
                                placeholder="Pilih Warna"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="jobClass" className="label font-bold">
                                JobClass
                            </label>
                            <Select
                                name="jobClass"
                                id="jobClass"
                                instanceId="jobClass"
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isClearable={false}
                                isRtl={false}
                                isSearchable={false}
                                options={job_classes}
                                onChange={handleJobClassSelect}
                                required={true}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="cron" className="label font-bold">
                                CRON
                            </label>
                            <input
                                type="text"
                                name="cron"
                                id="cron"
                                value={jobState.cron}
                                onChange={handleFormChange}
                                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                                placeholder="schedule"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="website" className="label font-bold">
                                Website
                            </label>
                            <Select
                                id="selectWebsites"
                                instanceId="selectWebsites"
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="selectWebsites"
                                options={connectorOptions}
                                onChange={handleWebsiteSelect}
                            />
                        </div>

                        <div className="flex gap-10 items-center">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    value="true"
                                    checked={isTrue}
                                    onChange={handleRadioChange}
                                    id="radioDefault1"
                                    name="active"
                                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />
                                <label
                                    htmlFor="radioDefault1"
                                    className="inline-block tet-gray-800"
                                >
                                    Active
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    value="false"
                                    checked={!isTrue}
                                    onChange={handleRadioChange}
                                    id="radioDefault2"
                                    name="active"
                                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                />
                                <label
                                    htmlFor="radioDefault2"
                                    className="inline-block tet-gray-800"
                                >
                                    Inactive
                                </label>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>
                                Close
                            </button>
                            <button type="submit" className="btn">
                                Save
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}