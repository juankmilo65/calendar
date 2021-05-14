import React, { memo } from "react";
import styled from "styled-components";
import { IPriority } from "../../interfaces";


const Wrapper = styled.div`
    height: auto;
    width: 100%;
    padding: 0px 16px 24px 16px;
    box-sizing: border-box;
  `;

const Item = styled.div`
    display: flex;
    align-items: center;
    height: 48px;
    position: relative;
  `;

const RadioButtonLabel = styled.label`
    position: absolute;
    top: 25%;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    border: 1px solid #bebebe;
  `;
const RadioButton = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    &:hover ~ ${RadioButtonLabel} {
      background: #bebebe;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 6px;
        background: #eeeeee;
      }
    }
    ${(props) =>
        props.checked &&
        ` 
      &:checked + ${RadioButtonLabel} {
        background:  ${props.color};
        border: 1px solid  ${props.color};
        &::after {
          content: "";
          display: block;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          margin: 6px;
          box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
          background: white;
        }
      }
    `}
  `;

export default memo(function usePriority(props: IPriority) {

    const { handlePriority, priorityValue } = props;
    const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        handlePriority(value);
    };
    const priorities = [
        {
            item: 'Urgent',
            value: '#FF0000'
        },
        {
            item: 'Holliday',
            value: '#00FF00'
        },
        {
            item: 'Social Event',
            value: '#FFFF00'
        }]

    return (
        <Wrapper>

            {priorities.map((priority) => (
                <Item>
                    <RadioButton
                        type="radio"
                        name="radio"
                        value={priority.value}
                        checked={priorityValue === priority.value}
                        color={priority.value}
                        onChange={(event) => handleSelectChange(event)}
                    />
                    <RadioButtonLabel />
                    <div>{priority.item}</div>
                </Item>
            ))}
        </Wrapper>
    )
})
