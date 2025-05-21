import { useNavigate } from 'react-router-dom';

import { RiArrowLeftLine } from "react-icons/ri";

import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className='back-button' onClick={() => navigate(-1)}>
        <RiArrowLeftLine />
    </button>
  );
}

export default BackButton;