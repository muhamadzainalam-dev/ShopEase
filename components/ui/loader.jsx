import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="card @apply bg-[color:var(--bg-color)] px-8 py-4 rounded-[1.25rem] --bg-color: #fc6717">
        <div className="loader  @apply text-[rgb(15,15,15)] font-medium text-[25px] box-content h-10 flex p-2.5 rounded-lg">
          <p>loading</p>
          <div className="words">
            <span className="word @apply block h-full text-[#fbfaff] animate-[spin\_4991_3s_infinite] pl-1.5">
              CATEGORIES
            </span>
            <span className="word @apply block h-full text-[#fbfaff] animate-[spin\_4991_3s_infinite] pl-1.5">
              PRODUCTS
            </span>
            <span className="word @apply block h-full text-[#fbfaff] animate-[spin\_4991_3s_infinite] pl-1.5">
              ITEMS
            </span>
            <span className="word @apply block h-full text-[#fbfaff] animate-[spin\_4991_3s_infinite] pl-1.5">
              DEALS
            </span>
            <span className="word @apply block h-full text-[#fbfaff] animate-[spin\_4991_3s_infinite] pl-1.5">
              OFFERS
            </span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    /* color used to softly clip top and bottom of the .words container */
    --bg-color: #fc6717;
    background-color: var(--bg-color);
    padding: 1rem 2rem;
    border-radius: 1.25rem;
  }
  .loader {
    color: rgb(15, 15, 15);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 25px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 40px;
    padding: 10px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 8px;
  }

  .words {
    overflow: hidden;
    position: relative;
  }
  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    );
    z-index: 20;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 6px;
    color: #fbfaff;
    animation: spin_4991 3s infinite;
  }

  @keyframes spin_4991 {
    10% {
      -webkit-transform: translateY(-102%);
      transform: translateY(-102%);
    }

    25% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }

    35% {
      -webkit-transform: translateY(-202%);
      transform: translateY(-202%);
    }

    50% {
      -webkit-transform: translateY(-200%);
      transform: translateY(-200%);
    }

    60% {
      -webkit-transform: translateY(-302%);
      transform: translateY(-302%);
    }

    75% {
      -webkit-transform: translateY(-300%);
      transform: translateY(-300%);
    }

    85% {
      -webkit-transform: translateY(-402%);
      transform: translateY(-402%);
    }

    100% {
      -webkit-transform: translateY(-400%);
      transform: translateY(-400%);
    }
  }
`;

export default Loader;
