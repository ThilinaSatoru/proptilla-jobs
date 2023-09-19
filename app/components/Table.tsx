import { BiEdit, BiTrashAlt } from "react-icons/bi";

type Job = {
  id: number;
  name: string;
  jobClass: string;
  cron: string;
  active: boolean;
  createdOn: Date;
  lastExecutedOn: Date;
};

export default async function Table() {
  
  const response = await fetch(process.env.API_URL + "/api/v1/jobs");
  const jobs: Job[] = await response.json();
  console.log(JSON.stringify(jobs));

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Id</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Job</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">CRON_TIME</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Active</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">createdOn</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">lastExecutedOn</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {jobs.map((job, index) => (
          <tr key={index} className="bg-gray-50 text-center">
            <td className="px-16 py-2 flex flex-row items-center">
              <span className="text-center ml-2 font-semibold">{job.id}</span>
            </td>
            <td className="px-16 py-2">
              <span>{job.name}</span>
            </td>
            <td className="px-16 py-2">
              <span>{job.jobClass}</span>
            </td>
            <td className="px-16 py-2">
              <span>{job.cron}</span>
            </td>
            <td className="px-16 py-2">
              <button className="cursor">
                <span className="bg-green-500 text-white px-5 py-1 rounded-full">
                  Active
                </span>
              </button>
            </td>
            <td className="px-16 py-2">
              <span>{job.createdOn?.getTime()}</span>
            </td>
            <td className="px-16 py-2">
              <span>{job.lastExecutedOn?.getTime()}</span>
            </td>
            <td className="px-16 py-2 flex justify-around gap-5">
              <button className="cursor">
                <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
              </button>
              <button className="cursor">
                <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
