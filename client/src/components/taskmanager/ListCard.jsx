/* eslint-disable react/prop-types */
import "./listcard.scss";
import { BiChevronLeft, BiChevronRight, BiTrash } from "react-icons/bi";
import { arrowClick, deleteItem } from "../../redux/taskSlice";
import { useDispatch } from "react-redux";
import icon from "../../assets/edit.png";
import { useState } from "react";

const ListCard = (items) => {
  const { item } = items;
  console.log(item);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.task);
  const dispatch = useDispatch();
  const newItem = { ...item, task: value };
  const ArrowClick = (string) => {
    dispatch(arrowClick(newItem, string));
  };
  const handleDelete = () => {
    dispatch(deleteItem(item._id));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
    // onUpdate(value);
  };
  return (
    <div>
      <ul
        className={` ${newItem.status === "done" ? "completed menu" : "menu"}`}
      >
        <li>
          <p>{item._id}</p>
        </li>
        <li>
          <div className="editContainer">
            {isEditing ? (
              <input
                className="textInput"
                type="text"
                value={value}
                onChange={handleInputChange}
                onBlur={handleUpdateClick} // This will update the value when input loses focus
                autoFocus // This will focus the input field when it appears
              />
            ) : (
              <input type="text" className="textInput" value={value} readOnly />
            )}

            <img
              src={icon}
              alt="Edit Icon"
              className="editIcon"
              onClick={handleEditClick}
            />
            <button onClick={() => ArrowClick(newItem)}>SAVE</button>
          </div>
          {/* <p>{item.task}</p> */}
        </li>
        <li>
          <p>{item.status}</p>
        </li>
        <li>
          <button
            disabled={newItem.status === "backlog"}
            onClick={() => ArrowClick("left")}
          >
            <BiChevronLeft />
          </button>
          <button
            disabled={newItem.status === "done"}
            onClick={() => ArrowClick("right")}
          >
            <BiChevronRight />
          </button>
          <button onClick={handleDelete}>
            <BiTrash />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ListCard;
