import styles from "./WarningMessage.module.css";

export default function WarningMessage() {
  return (
    <section className={`container ${styles.container}`}>
      <h2 className={styles.warningMainHeader}>Внимание!</h2>
      <h4>В данный момент сайт находится в тестовом режиме и заказ фигурок не доступен. По всем вопросам пишите на</h4>
      <a className={styles.link} href="mailto:stalingrad.figures@gmail.com">stalingrad.figures@gmail.com</a>
    </section>
  );
}
