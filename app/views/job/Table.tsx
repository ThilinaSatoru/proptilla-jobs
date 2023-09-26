import "@/app/core/dto/Job";
import {Job} from "@/app/core/dto/Job";
import Delete from "@/app/views/job/Delete";
import Update from "@/app/views/job/Update";
import Toggle from "@/app/views/job/Toggle";


export default async function Table() {

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/jobs", {cache: 'no-store'});
  const jobs: Job[] = await response.json();
  // console.log(JSON.stringify(jobs));

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
            <span className="text-gray-200">On/Off</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Edit/Del</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">createdOn</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">lastExecutedOn</span>
          </th>

        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {jobs.map((job, index) => (
            <tr key={index} className="bg-gray-50">
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
                <Toggle {...job}/>
              </td>
              <td className="px-16 py-2 flex justify-around gap-5">
                <Update {...job}/>
                <Delete {...job}/>
              </td>
              <td className="px-16 py-2">
                <span>{job.createdOn?.toString()}</span>
              </td>
              <td className="px-16 py-2">
                <span>{job.lastExecutedOn?.toString()}</span>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}
