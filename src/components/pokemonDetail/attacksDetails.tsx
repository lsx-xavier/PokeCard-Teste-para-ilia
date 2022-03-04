import { useRef } from "react";

interface PropsInterface {
  showModal: Boolean;
  setShowModal: any;
  attacks?: Attack;
}

interface Attack {
  convertedEnergyCost: number;
  cost: [];
  damage: string;
  name: string;
  text: string;
}

export default function AttacksDetails({
  showModal,
  setShowModal,
  attacks,
}: PropsInterface) {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <main id="modal" ref={modalRef} onClick={closeModal}>
          <section>
            <span
              className="fechar"
              onClick={() => setShowModal((prev) => !prev)}
            ></span>
            <h3>{attacks?.name}</h3>

            <div className="detailsAttack">
              <p>Dano: {attacks?.damage}</p>
              <p>Mana: {attacks?.convertedEnergyCost}</p>
              <div>
                <h5>Elementos pra o ataque:</h5>
                {attacks?.cost.map((x, index) => (
                  <span key={index}>{x} </span>
                ))}
              </div>
            </div>

            <div className="description">{attacks?.text}</div>
          </section>
        </main>
      ) : null}
    </>
  );
}
