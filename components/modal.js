'use client'
import { Children, useState } from "react";


export default function Modal({ classFirstDivButton ,classFirstButton, FirstButton, classCloseModal, classDivChildren, Children, classDivButton, classSecondButton, secondButton }) {

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div>
      <div className={classFirstDivButton}>
      <button className={classFirstButton} onClick={openModal}>{FirstButton}</button>
      </div>
      {isOpen && (
        <div className={classCloseModal} onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <div className={classDivChildren}>
              {Children}
              <div className={classDivButton}>
                <button className={classSecondButton} onClick={closeModal}>{secondButton}</button>
              </div>
            </div>
          </div>
        </div>)}
    </div>
  )
}



