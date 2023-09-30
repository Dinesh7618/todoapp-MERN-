import React, { useContext, useState } from "react";
import moment from "moment";
import "./task.css";
import TaskContext from "../../context/TaskContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TokenContext from '../../context/TokenContext';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

function Task({ task, id}) {
  // console.log("dinesh sharma1234",task)
  
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext)
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority || "medium"); // Default priority
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? moment(task.dueDate).format("YYYY-MM-DD") : ""
  ); // Default due date


const handleRemove = async () => {
  try {
      const res = await axios.post("/api/task/removeTask", {
          task
      }, {
          headers: {
              Authorization: `Bearer ${userToken}`
          }
      })
  } catch (error) {
      console.log(error);
  }

  dispatch({
        type: "REMOVE_TASK",
        id,
      });

}
  const handleMarkDone = () => {
    dispatch({
      type: "MARK_DONE",
      id,
    });
  };
  const edit=()=>{
    editTask()
    // editTask()
  }
 
  const editTask = async () => {
    console.log("edit - ",task)
    dispatch({
      type: "EDIT_TASK",
      id,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      dueDate: editedDueDate,
    }); 
    if(isEditing){
    try {
        const res = await axios.post("/api/task/editTask", {
            task
        }, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
    } catch (error) {
        console.log(error);
    }
   
  }
  setIsEditing(!isEditing);

  }

  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3 overflow-hidden">
      <div className="mark-done">
        <Checkbox onChange={handleMarkDone} checked={task.completed} />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              label="Description"
              variant="outlined"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              variant="outlined"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            />
          </>
        ) : (
          <>
            <Typography variant="h6" component="div">
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Typography className={`task-priority ${task.priority}`}>
              {task.priority}
            </Typography>
            {task.dueDate && (
              <Typography className="task-due-date">
                Due Date: {moment(task.dueDate).fromNow()}
              </Typography>
            )}
          </>
        )}
        <div className="italic opacity-60">
          {task?.createdAt ? (
            <p>Created: {moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <div className="task-actions text-sm text-white">
        {isEditing ? (
          <EditIcon
            style={{ fontSize: 30, cursor: "pointer" }}
            onClick={edit}
          />
        ) : (
          <EditIcon
            style={{ fontSize: 30, cursor: "pointer" }}
            onClick={edit}
            color="disabled"
          />
        )}
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          onClick={handleRemove}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </div>
    </div>
  );
}

export default Task;
