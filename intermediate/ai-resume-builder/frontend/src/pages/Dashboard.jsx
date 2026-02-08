import { FilePenLineIcon, PencilIcon, PlusIcon, Trash2Icon, UploadCloudIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dummyResumeData } from '../assets/assets.js';
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState([]);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');

  const fetchAllResumes = async () => {
    try {
      setAllResumes(dummyResumeData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const createResume = async (e) => {
    e.preventDefault();
    try {
      console.log(title);
      setShowCreateResume(false);
      setTitle('');
      navigate(`/app/builder/resumeId-123`);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllResumes();
  }, [allResumes, setAllResumes]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 py-10">
        <p className="text-2xl font-medium mb-5 bg-linear-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent sm:hidden">
          Welcome, krish kumar
        </p>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-3 text-slate-600 border border-dashed border-slate-400 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-12 transition-all duration-300 p-3 bg-linear-to-r from-indigo-300 to-indigo-500 text-whiet rounded-full" />
            <p className="text-sm transition-all duration-300 group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-3 text-slate-600 border border-dashed border-slate-400 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-12 transition-all duration-300 p-3 bg-linear-to-r from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm transition-all duration-300 group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[350px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `baseColor + '40`,
                }}
              >
                <FilePenLineIcon
                  className="size-7 transition-all group-hover:scale-105"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {" "}
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-600 transition-all duration-300 px-2 text-center "
                  style={{ color: baseColor + 90 }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <Trash2Icon className="size-7 p-1.5 rounded text-slate-700 transition-colors" />
                  <PencilIcon className="size-7 p-1.5 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-100 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl text-slate-800 text-center font-bold mb-5">
                Create a Resume
              </h2>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-slate-700 outline-0 border-gray-300 border px-5 py-2 mb-4 rounded  focus:border-blue-600 ring-blue-600"
                type="text"
                placeholder="Enter resume title"
                required
              />
              <button
                disabled={!title.trim()}
                className={`w-full text-center py-2 rounded text-white  duration-200 ${
                  !title.trim()
                    ? "cursor-not-allowed bg-blue-200"
                    : "hover:bg-blue-600 bg-blue-400"
                } `}
              >
                Create Resume
              </button>
              <XIcon
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute size-6 top-2 right-2  text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div>
              <h2>Upload a Resume</h2>
              <input type="file" />
              <button>Upload Resume</button>
              <XIcon
                onClick={() => setShowUploadResume(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-slate-600 transition-colors cursor-pointer duration-150"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Dashboard
