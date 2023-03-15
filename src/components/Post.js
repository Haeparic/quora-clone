import { Avatar, Input, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  ChatBubbleOutlineOutlined,
  ExpandMore,
  MoreHorizOutlined,
  PeopleAltOutlined,
  ReportOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionId,
  selectQuestionName,
  setQuestionInfo,
} from "../features/questionSlice";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import firebase from "firebase";
Modal.setAppElement("#root");

const Post = ({ key, Id, image, question, timestamp, quoraUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const questionId = useSelector(selectQuestionId);
  const questionName = useSelector(selectQuestionName);
  const [getAnswer, setGetAnswer] = useState([]);
  const handleAnswer = (e) => {
    e.preventDefault();
    if (questionId) {
      db.collection("questions").doc(questionId).collection("answer").add({
        questionId: questionId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        answer: answer,
        user: user,
      });
      console.log(questionId, questionName);
      setAnswer("");
      setOpenModal(false);
    }
  };
  useEffect(() => {
    if (questionId) {
      db.collection("questions")
        .doc(questionId)
        .collection("answer")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setGetAnswer(
            snapshot.docs.map((doc) => ({ id: doc.id, answers: doc.data() }))
          )
        );
    }
  }, [questionId]);

  return (
    <div
      className="post"
      onClick={() =>
        dispatch(setQuestionInfo({ questionId: Id, questionName: question }))
      }
    >
      <div className="post-info">
        <Avatar src={quoraUser.photo} />
        <h5>
          {quoraUser.displayName ? quoraUser.displayName : quoraUser.email}
        </h5>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </div>
      <div className="post-body">
        <div className="post-question">
          <div className="flex items-center gap-1">
            <p>{question}</p>
            <button
              className="text-sm border"
              onClick={() => setOpenChangeModal(true)}
            >
              수정하기
            </button>
            <Modal
              isOpen={openChangeModal}
              onRequestClose={() => {
                setOpenChangeModal(false);
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
                <Avatar src={quoraUser.photo} />
                <p>
                  {" "}
                  질문자 :{" "}
                  {quoraUser.displayName
                    ? quoraUser.displayName
                    : quoraUser.email}{" "}
                </p>
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
                  className="modal-txt"
                />
                <div className="modal-fieldLink">
                  <Link />
                  <Input
                    type="text"
                    placeholder="url 링크만을 작성해 주세요"
                    className="modal-txt"
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button type="text" className="add">
                  수정하기
                </button>
                <button
                  onClick={() => setOpenChangeModal(false)}
                  className="can"
                >
                  닫기
                </button>
              </div>
            </Modal>
            <button className="text-sm border">삭제하기</button>
          </div>
          <button
            class="group relative inline-flex items-center overflow-hidden rounded border border-current px-2 py-1 text-green-600 focus:outline-none focus:ring active:text-green-500"
            onClick={() => setOpenModal(true)}
          >
            <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-1">
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <span class="text-sm font-medium transition-all group-hover:mr-4">
              답변하기
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
            <div className="modal-question">
              <h1>{question}</h1>
              <p>
                <span className="name">
                  {quoraUser.displayName
                    ? quoraUser.displayName
                    : quoraUser.email}
                </span>
                로부터의 질문{" "}
                <span className="time">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
                에 작성됨
              </p>
            </div>
            <div className="modal-answer">
              <textarea
                placeholder="답변을 작성해 주세요"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button type="submit" className="add" onClick={handleAnswer}>
                답변달기
              </button>
              <button onClick={() => setOpenModal(false)} className="can">
                닫기
              </button>
            </div>
          </Modal>
        </div>
        <div className="post_answer">
          {getAnswer.map(({ id, answers }) => (
            <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      position: "absolute",
                      color: "yellowgreen",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    {" "}
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}
                    </span>{" "}
                    {new Date(answers.timestamp?.toDate()).toLocaleString()} 에
                    작성됨
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
        </div>
        <img src={image} alt="" />
      </div>
      <div className="post-footer">
        <div className="post-footerAction">
          <ArrowUpwardOutlined />
          <ArrowDownwardOutlined />
        </div>
        <ReportOutlined />
        <ChatBubbleOutlineOutlined />
        <div className="post-footerRight">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  );
};

export default Post;
