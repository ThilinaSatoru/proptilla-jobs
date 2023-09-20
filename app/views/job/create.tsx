"use client";
import Select from "react-select";
import {useState} from "react";
import {MdCancelScheduleSend} from "react-icons/md";
import {City} from "@/app/core/dto/City";

const optiones = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


export default function Create() {
  const [modal, setModal] = useState(false);
  const [warna, setWarna] = useState<{ value: string, label: string }[]>();
  const [cities, setCities] = useState<City[]>([])
  const options: { value: string, label: string }[] = []

  const handleWarnaChange = async (selected: any, selectaction: any) => {
    const { action } = selectaction;
    // console.log(`action ${action}`);
    if (action === "clear") {
    } else if (action === "select-option") {
    } else if (action === "remove-value") {
      console.log("remove");
    }
    setWarna(selected);
  };

  async function loadOptions() {
    fetch("http://localhost:8081/api/v1/cities")
        .then((res) => res.json())
        .then((data) => {

          setCities(data as City[])
          cities.forEach(city=>{
            options.push({ value: city.name, label: city.code })
          })

        })
  }

  function handleChange() {
    setModal(!modal);

    loadOptions().then(r => {
      console.log(options)
    })
  }

  return (
    <div>
      <button
        onClick={handleChange}
        className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-grary-50 hover:border-indigo-500 hover:text-gray-800"
      >
        Add Job{" "}
        <span className="px-1">
          <MdCancelScheduleSend size={23}></MdCancelScheduleSend>
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
          <h3 className="font-bold text-lg">Heloo</h3>

          <form action="">
            <div className="form-control">
              <label htmlFor="name" className="label font-bold">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input w-full input-bordered"
              />
            </div>
            <div className="form-control">
              <label htmlFor="JobClass" className="label font-bold">
                JobClass
              </label>
              <input
                type="text"
                name="JobClass"
                id="JobClass"
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder="JobClass"
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
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder="schedule"
              />
            </div>
            <div className="form-control">
              <label htmlFor="website" className="label font-bold">
                Website
              </label>
              <input
                type="text"
                name="website"
                id="website"
                className="border w-full px-5 py-3 focus:outline-none rounded-md"
                placeholder="website"
              />
            </div>
            <div className="form-control">
              <label htmlFor="" className="label font-bold">
                Cities
              </label>
              <Select
                id="selectWarna"
                instanceId="selectWarna"
                isMulti
                name="colors"
                className="basic-multi-select"
                classNamePrefix="select"
                options={options}
                onChange={handleWarnaChange}
                placeholder="Pilih Warna"
              />
            </div>

            <div className="flex gap-10 items-center">
              <div className="form-check">
                <input
                  type="radio"
                  value="Active"
                  id="radioDefault1"
                  name="status"
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
                  value="Inactive"
                  id="radioDefault2"
                  name="status"
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
