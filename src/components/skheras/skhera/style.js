import styled from "styled-components";

export const SkheraContainer = styled.div`
  display: "flex";
  bordercolor: #e6e6e6;
  borderwidth: 1px;
  borderradius: 4px;
  borderstyle: solid;
  flexdirection: "column";
  padding: 16px;
  marginbottom: 16px;

  .my-skheras-header {
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }

  .skhera-count {
    font-size: 24px;
    color: #419d78;
  }

  .status-tracker {
    margin-top: 54px;
  }

  .textual-status {
    display: flex;
    text-align: center;
    justify-content: space-between;
    margin-left: 60px;
    margin-right: 60px;
  }

  .status-item {
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .status-item-selected {
    color: #419d78;
  }

  .mini-status {
    color: #909090;
    font-size: 12px;
  }

  .mini-status-selected {
    color: #419d78;
  }

  .status-dot {
    width: 18px !important;
    height: 18px !important;
    display: block !important;
    position: unset !important;
    margin-right: 0 !important;
    background-color: white !important;
    border: 1px solid #dadfe2;
  }

  .status-dot-selected {
    background-color: #419d78 !important;
    border: unset;
  }

  .status-dots-connector {
    height: 1px;
    background-color: #9e9e9e;
    margin-top: -10px;
  }

  .client-map {
    margin-top: 48px;
  }

  .my-skhera-details {
    display: flex;
    margin-top: 36px;
  }

  .my-skhera-text-details {
    display: flex;
    flex-direction: column;
    width: calc(100% - 300px);
    margin: 8px;
  }

  .carved {
    color: #909090;
  }

  .my-skhera-address {
    margin-top: 24px;
    display: flex;
    align-items: center;
  }

  .my-skhera-description {
    margin-top: 36px;
  }

  .my-skhera-rider-details {
    width: 300px;
  }

  .my-skhera-price-est {
    display: flex;
    justify-content: space-between;
    margin: 24px 36px 24px 36px;
  }

  .estimated-price-labels {
    display: flex;
    flex-direction: column;
  }

  .estimated-price {
    font-size: 24px;
  }

  .estimated-time-distance {
    font-size: 14px;
  }

  .estimated-price-value {
    font-size: 24px;
    color: #419d78;
    text-align: end;
  }

  .estimated-time-distance-value {
    font-size: 16px;
    color: #909090;
  }

  .rider-profile-img {
    width: 48px;
    height: 48px;
    margin-right: 8px;
  }

  .my-skhera-rider-details {
    display: flex;
    align-self: start;
    justify-content: space-between;
    background-color: #f1f1f1;
    padding: 8px;
  }
`;
