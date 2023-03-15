import React, { useState } from "react";
import "./Navbar.css";
import {
  AssignmentIndOutlined,
  BorderAllRounded,
  ExpandMore,
  Home,
  Language,
  NotificationsOutlined,
  PeopleAltOutlined,
  Link,
} from "@mui/icons-material";
import { Avatar, Input } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import Modal from "react-modal";
import firebase from "firebase";

function Navbar(props) {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const user = useSelector(selectUser);
  const handleQuestion = (e) => {
    e.preventDefault();
    setOpenModal(false);
    db.collection("questions").add({
      question: input,
      imageUrl: inputUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user,
    });
    setInput("");
    setInputUrl("");
  };
  return (
    <div class="flex items-center justify-between p-[10px] bg-white w-full sticky top-0 z-[999] shadow">
      <div>
        <img
          src="./images/quora.png"
          alt=""
          className="mr-[20px] ml-[15px] h-[50px] object-contain"
        />
      </div>
      <div className="flex mx-[20px] items-center">
        <div className="qHeader-icon">
          <Home />
        </div>
        <div className="qHeader-icon">
          <BorderAllRounded />
        </div>
        <div className="qHeader-icon">
          <AssignmentIndOutlined />
        </div>
        <div className="qHeader-icon">
          <PeopleAltOutlined />
        </div>
        <div className="qHeader-icon">
          <NotificationsOutlined />
        </div>
      </div>
      {/* <div className="flex items-center w-[400px] h-full p-[5px] border-solid border-green-300 rounded-[5px]">
          <input type="text" placeholder="검색하기" />
          <Search />
        </div> */}
      <div class="relative">
        <label class="sr-only" for="search">
          Search
        </label>
        <input
          class="h-10 w-full rounded-full border-none bg-white pl-4 pr-10 text-sm shadow-sm sm:w-56"
          id="search"
          type="search"
          placeholder="검색하기"
        />

        <button
          type="button"
          class="absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-green-300 p-2 text-gray-600 transition hover:text-gray-700"
        >
          <span class="sr-only">Submut Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="qHeader-Rem flex items-center">
        <div className="cursor-pointer">
          <Avatar src={user.photo} onClick={() => auth.signOut()} />
        </div>
        <Language className="mx-5" />
        <button
          class="group relative inline-block overflow-hidden border border-green-600 px-4 py-2 focus:outline-none focus:ring"
          onClick={() => setOpenModal(true)}
        >
          <span class="absolute inset-y-0 left-0 w-[2px] bg-green-600 transition-all group-hover:w-full group-active:bg-green-500"></span>
          <span class="relative text-sm font-medium text-green-600 transition-colors group-hover:text-white">
            질문하기
          </span>
        </button>
        <Modal
          isOpen={openModal}
          onRequestClose={() => {
            setOpenModal(false);
          }}
          shouldCloseOnOverlayClick={false}
          style={{
            overlay: {
              width: 700,
              height: 600,
              background: "rgba(0,0,0,0.8",
              zIndex: "1000",
              top: "50%",
              left: "50%",
              marginTop: "-300px",
              marginLeft: "-350px",
            },
          }}
        >
          <div className="modal-title">
            <h5>질문</h5>
            <h5>공유하기</h5>
          </div>
          <div className="modal-info">
            <Avatar src={user.photo} />
            <p> 질문자 : {user.displayName ? user.displayName : user.email} </p>
            <div className="modal-scope">
              <PeopleAltOutlined />
              <p>전체공개</p>
              <ExpandMore />
            </div>
          </div>
          <div className="modal-field">
            <Input
              type="text"
              placeholder="6하 원칙으로 질문을 작성하세요"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="modal-txt"
            />
            <div className="modal-fieldLink">
              <Link />
              <Input
                type="text"
                placeholder="url 링크만을 작성해 주세요"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="modal-txt"
              />
            </div>
          </div>
          <div className="modal-buttons">
            <button type="text" className="add" onClick={handleQuestion}>
              질문하기
            </button>
            <button onClick={() => setOpenModal(false)} className="can">
              닫기
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
