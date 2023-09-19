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

async function fetchJobs() {
  const res = await fetch("https://proptilla.cosmoforge.com/api/v1/jobs", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return res.json();
}

export default async function JobList() {
  const response = await fetch("https://proptilla.cosmoforge.com/api/v1/jobs");
  const jobs: Job[] = await response.json();
  console.log(JSON.stringify(jobs));

  return (
    <tr className="bg-gray-50 text-center">
      {jobs.map((job, index) => (
        <td key={job.id} className="px-16 py-2 flex flex-row items-center">
          <span className="text-center ml-2 font-semibold">{job.name}</span>
        </td>
      ))}
    </tr>
  );
}
