import { ChangeEvent, memo, useState } from 'react';
import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { IModal, IStyleModal } from '../../interfaces';
import Priority from '../Priority/usePriority';
import Weather from '../Weather/useWeather';

const StyledModal = Modal.styled`
  border-radius: 20px;
  width: 40rem;
  height: 20rem;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition : all 0.3s ease-in-out;
  `;

const Distribution = styled.div`
  display: grid;
  `;

const FadingBackground = styled(BaseModalBackground) <IStyleModal>`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const ContenModal = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
`;

const DivWraper = styled('div')`
 border-radius: 20px 20px 0 0;
 display:flex;
 justify-content: center;
 background-color: #3f75a5;
 color: #DDDCDD;
 padding: 16px;
`;

const EventWraper = styled('div')`
 display:flex;
 justify-content: center;
 padding: 16px;
`;

const WeatherWraper = styled(EventWraper)`

`;

export default memo(function useModal(props: IModal) {

    const { driveModalEvent, isOpen, day } = props;
    const [opacity, setOpacity] = useState(0);
    const [modalState, setModalState] = useState({
        event: '',
        time: '',
        priority: '#FF0000'
    })

    const toggleModal = (_e: any) => {
        setOpacity(0);
        driveModalEvent(!isOpen, undefined);
    }

    const beforeClose = () => {
        return new Promise((resolve) => {
            setOpacity(0);
            setTimeout(resolve, 300);
        });
    }

    const afterOpen = () => {
        setTimeout(() => {
            setOpacity(1);
        }, 100);
    }

    const handlePriority = (priority: string) => {
        setModalState({ ...modalState, priority });
    }

    const handleEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setModalState({ ...modalState, event: event.target.value });
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        alert(modalState.event)
    }

    return (
        <ModalProvider backgroundComponent={FadingBackground}>

            <StyledModal
                isOpen={isOpen}
                afterOpen={afterOpen}
                beforeClose={beforeClose}
                backgroundProps={{ opacity }}
            >
                <DivWraper>
                    <span>Schedule event!</span>
                </DivWraper>

                <Distribution>
                    <ContenModal>
                        <EventWraper>
                            <form onSubmit={onSubmit}>
                                <label>Event* :
                                    <input type="text" required maxLength={30} name="name" value={modalState.event} onChange={handleEvent} />
                                </label>
                                <Priority handlePriority={handlePriority} priorityValue={modalState.priority} />
                                <button type="submit">Save Event</button>
                                <button onClick={toggleModal}>Close</button>
                            </form>
                        </EventWraper>
                        <WeatherWraper>
                            <span>Weather!</span>
                            <Weather day={day}></Weather>
                        </WeatherWraper>
                    </ContenModal>
                </Distribution>
            </StyledModal>
        </ModalProvider>
    )
})
