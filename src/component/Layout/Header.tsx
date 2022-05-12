import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Header: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <h1>
            <Link href="/">
              <a>home</a>
            </Link>
          </h1>
          <Link href="/login">
            <a>Login/Signup</a>
          </Link>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
};
