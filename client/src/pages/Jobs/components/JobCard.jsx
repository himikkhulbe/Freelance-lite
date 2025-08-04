import { Clock, IndianRupee } from "lucide-react";
import JobsCard from "../../../components/Common/JobsCard";
import { useAuth } from "../../../contexts/AuthContext";

const JobCard = ({ data }) => {
  const { user } = useAuth();
  return (
    <>
      {data.length > 0 ? (data.map((job) => {
        return (
          <JobsCard key={job._id} data={job} loggedInUser={user?.user} />
        );
      })) : (
        <h1>No Jobs Found</h1>
      )}
    </>
  );
};

export default JobCard;
