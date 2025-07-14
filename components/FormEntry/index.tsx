"use client";
import styles from './index.module.css';
import { useRef, useEffect, useState } from "react";

export default function FormEntry() {
  const submitted = useRef(false);
  return (
    <>
      <p style={{ textAlign: "center", margin: "40px auto" }}>
        お気軽にお問い合わせください。
      </p>
      <form 
      action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScnP7q8qWi1o2h9c9WBjP46J4W1c-7hmdYEG0_dbCS0Jecg_w/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={() => { submitted.current = true; }}
        className="c-form">
        <div className="c-form__item">
          <label className="c-form__label" htmlFor="field-name">
            名前・会社名<span className="c-form__required">必須</span>
          </label>
          <input
            name="entry.1759742332"
            className="c-form__input"
            id="field-name"
            placeholder="株式会社 山田"
            type="text"
            required
          />
        </div>
        <div className="c-form__item">
          <label className="c-form__label" htmlFor="field-mail">
            メールアドレス<span className="c-form__required">必須</span>
          </label>
          <input
            name="entry.611978144"
            className="c-form__input"
            id="field-mail"
            placeholder="sample@gmail.com"
            type="email"
            required
          />
        </div>
        <div className="c-form__item">
          <label className="c-form__label" htmlFor="field-message">
            メッセージ内容
          </label>
          <textarea
            name="entry.1687487503"
            className="c-form__input"
            id="field-message"
            placeholder="お問い合わせ内容"
          />
        </div>
        <div className="c-form__submit">
          <button type="submit">送信する</button>
        </div>
      </form>
      <iframe
        name="hidden_iframe"
        id="hidden_iframe"
        style={{ display: "none" }}
        onLoad={() => {
          if (submitted.current) {
            window.location.href = "https://bamv.co.jp/"; // 仮。thanksページのURLを入れる
          }
        }}
      />
    </>
  );
}
