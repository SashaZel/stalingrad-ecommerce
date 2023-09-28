import { useAtomValue } from "jotai/react";
import styles from "./layout.module.css";
import { cartAtom } from "../../lib/store";
import Link from "next/link";
import { useState } from "react";
import IconGitHub from "../icons/IconGitHub";
import WarningMessage from "../warning-message/WarningMessage";

export default function Layout({ children }: { children: JSX.Element[] }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCatalogueSubmenu, setShowCatalogueSubmenu] = useState(false);
  const cart = useAtomValue(cartAtom);
  // const itemsInCart = Object.keys(cart.cartItems).length;
  let itemsInCart = 0;
  for (let itemID in cart.cartItems) {
    itemsInCart += cart.cartItems[itemID].quantity;
  }
  return (
    <div className={styles.nextBody}>
      <header className={styles.header}>
        <div className={`container ${styles.containerHeader}`}>
          <Link className={styles.logo} href="/">
            <picture>
              <source srcSet="/img/logo-main.webp" type="image/webp" />
              <img src="/img/logo-main.png" className={styles.logoPicture} alt="logo Stalingrad" />
            </picture>
          </Link>
          <div className={styles.navCartContainer}>
            <nav className={`${styles.menu} ${showMobileMenu ? styles.menuShow : ""}`}>
              <ul className={styles.menuContainer}>
                <li className={styles.menuElement}>
                  <div
                    onClick={() => setShowCatalogueSubmenu((state) => !state)}
                    className={`${styles.menuLink} ${styles.menuLinkWithArrow}`}
                  >
                    <img
                      className={`${styles.arrowIcon} ${showCatalogueSubmenu ? styles.arrowIconUp : ""}`}
                      src="/img/icon-arrow.svg"
                      alt="icon"
                    />
                    <div>Каталог</div>
                  </div>
                  <ul className={`${styles.nestedMenu} ${showCatalogueSubmenu ? styles.nestedMenuShow : ""}`}>
                    <div className={styles.nestedMenuWithColumn}>
                      <div className={styles.nestedMenuContainer}>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/all-by-date/1/">
                            Все новые фигурки
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/all/1/">
                            Все по номерам
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/best-sellers/1/">
                            Бестселлеры
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/eastern-front/1/">
                            Все фигурки ВОВ
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/red-army/1/">
                            Красная армия
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/germans/1/">
                            Немцы
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/civilians/1/">
                            Гражданские
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/35-scale/1/">
                            Масштаб 1:35
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/16-scale/1/">
                            Масштаб 1:16
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/48-scale/1/">
                            Масштаб 1:48
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/modern/1/">
                            Современка
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/ww1/1/">
                            Первая мировая
                          </Link>
                        </li>
                        <li className={`${styles.menuElement} ${styles.submenuElement}`}>
                          <Link className={`${styles.menuLink} ${styles.submenuLink}`} href="/items/sci-fi/1/">
                            Фантастика
                          </Link>
                        </li>
                      </div>
                      <div className={styles.submenuRight}>
                        <button className={styles.submenuCloseButton} onClick={() => setShowCatalogueSubmenu(false)}>
                          Закрыть
                        </button>
                        <picture>
                          <source srcSet="/img/icon-live-01.webp" type="image/webp" />

                          <img className={styles.submenuRightImage} src="/img/icon-live-01.png" alt="icon" />
                        </picture>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className={styles.menuElement}>
                  <Link onClick={() => setShowMobileMenu(false)} href="/" className={styles.menuLink}>
                    О нас
                  </Link>
                </li>
                <li className={styles.menuElement}>
                  <Link onClick={() => setShowMobileMenu(false)} href="/" className={styles.menuLink}>
                    Доставка и оплата
                  </Link>
                </li>
                <li className={styles.menuElement}>
                  <a
                    target="_blanc"
                    className={styles.menuLink}
                    href="https://diorama.ru/forum/viewtopic.php?f=11&t=13272&start=2700"
                  >
                    Блог
                  </a>
                </li>
                <li className={styles.menuElement}>
                  <Link onClick={() => setShowMobileMenu(false)} href="/" className={styles.menuLink}>
                    Контакты
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={styles.headerRight}>
              <Link className={styles.cart} href="/cart/">
                <div className={styles.cartNumber}>{itemsInCart}</div>
              </Link>
              <button
                onClick={() => {
                  setShowMobileMenu(true);
                  setShowCatalogueSubmenu(false);
                }}
                className={`${styles.headerButton} ${!showMobileMenu ? "" : styles.headerButtonHidden}`}
              >
                <img className={styles.buttonImage} src="/img/icon-hamburger.svg" alt="" />
              </button>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowCatalogueSubmenu(false);
                }}
                className={`${styles.headerButton} ${showMobileMenu ? "" : styles.headerButtonHidden}`}
              >
                <img className={styles.buttonImage} src="/img/icon-close.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main
        className={styles.main}
        onClick={() => {
          setShowMobileMenu(false);
          setShowCatalogueSubmenu(false);
        }}
      >
        {children}
        <WarningMessage />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerBorders}>
          <div className={`container ${styles.footerUpper}`}>
            <div className={styles.footerContact}>
              <div className={`${styles.footerElement}`}>
                <Link href="/">
                  <picture>
                    <source srcSet="/img/logo-bw.webp" type="image/webp" />
                    <img width="131px" height="36px" src="/img/logo-bw.png" alt="logo" />
                  </picture>
                </Link>
                <p className={styles.footerPar}>
                  <b>Stalingrad-store - </b>
                  <br />
                  интернет-магазин оригинальной военно-исторической миниатюры
                </p>
              </div>
              <div className={`${styles.footerElement}`}>
                <p className={`${styles.footerBold} ${styles.footerGray}`}>ИП Зеленков Александр Сергеевич</p>
                <p className={`${styles.footerGray}`}>ОГРНИП 312246815900165</p>
                <a className={styles.footerEmail} target="_blank" href="mailto:stalingrad.figures@gmail.com">
                  stalingrad.figures@gmail.com
                </a>
                <div className={styles.footerIconsContainer}>
                  <a className={styles.footerIconSocial} target="_blank" href="https://t.me/sasha_zelenkov">
                    <img src="/img/icon-tg.svg" alt="icon_tg" />
                  </a>
                  <a className={styles.footerIconSocial} target="_blank" href="https://vk.com/stalingrad.figures">
                    <img src="/img/icon-vk.svg" alt="icon_vk" />
                  </a>
                  <a
                    className={styles.footerIconSocial}
                    target="_blank"
                    href="https://diorama.ru/forum/viewtopic.php?f=7&t=15238"
                  >
                    <picture>
                      <source srcSet="/img/icon-diorama.webp" type="image/webp" />
                      <img width="36px" height="36px" src="/img/icon-diorama.png" alt="logo" />
                    </picture>
                  </a>
                </div>
              </div>
            </div>
            <div className={`${styles.footerElement} ${styles.footerMap}`}>
              <div>
                <h4 className={styles.footerHeader}>Фигурки</h4>
                <Link className={styles.footerLink} href="/items/35-scale/1/">
                  Масштаб 1:35
                </Link>
                <Link className={styles.footerLink} href="/items/16-scale/1/">
                  Масштаб 1:16
                </Link>
                <Link className={styles.footerLink} href="/items/48-scale/1/">
                  Масштаб 1:48
                </Link>
                <Link className={styles.footerLink} href="/items/modern/1/">
                  Современка
                </Link>
                <Link className={styles.footerLink} href="/items/ww1/1/">
                  Первая мировая
                </Link>
                <Link className={styles.footerLink} href="/items/sci-fi/1/">
                  Фантастика
                </Link>
              </div>
              <div>
                <h4 className={styles.footerHeader}>Каталог</h4>
                <Link className={styles.footerLink} href="/items/all-by-date/1/">
                  Все новые фигурки
                </Link>
                <Link className={styles.footerLink} href="/items/all/1/">
                  Все по номерам
                </Link>
                <Link className={styles.footerLink} href="/items/best-sellers/1/">
                  Бестселлеры
                </Link>
                <Link className={styles.footerLink} href="/items/eastern-front/1/">
                  Все фигурки ВОВ
                </Link>
                <Link className={styles.footerLink} href="/items/red-army/1/">
                  Красная армия
                </Link>
                <Link className={styles.footerLink} href="/items/germans/1/">
                  Немцы
                </Link>
                <Link className={styles.footerLink} href="/items/civilians/1/">
                  Гражданские
                </Link>
              </div>
              <div>
                <h4 className={styles.footerHeader}>Покупателям</h4>
                <Link className={styles.footerLink} href="/items/all/1/">
                  Каталог
                </Link>
                <Link className={styles.footerLink} href="/">
                  О нас
                </Link>
                <Link className={styles.footerLink} href="/">
                  Доставка и оплата
                </Link>
                <Link className={styles.footerLink} href="/">
                  Блог
                </Link>
                <Link className={styles.footerLink} href="/">
                  Контакты
                </Link>
                <a className={styles.footerLink} target="black" href="https://stalingrad.diorama.ru/">
                  Старый сайт
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`container ${styles.footerBottom}`}>
          <div className={styles.footerCopyRights}>© 2009-2023 Stalingrad.</div>
          <p className={`${styles.footerPar} ${styles.footerPersonal}`}>
            Просматривая страницы данного интернет-сайта вы принимаете{" "}
            <a className={styles.footerPersonalLink} target="blanc" href="/common/personal-data-policy.pdf">
              политику конфиденциальности
            </a>{" "}
            компании в отношении обработки персональных данных.
          </p>
          <Link href="https://github.com/SashaZel/stalingrad-ecommerce">
          <div className={`${styles.footerPar} ${styles.footerAuthor}`}>
            <div>Магазин разработал Александр Зеленков</div><IconGitHub />
          </div></Link>
        </div>
      </footer>
    </div>
  );
}
