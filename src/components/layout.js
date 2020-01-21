/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"
import styled, { createGlobalStyle } from "styled-components"

import Nav from "./nav.js"
import StyledImageBlock from "./image-block.js"
import { Mobile } from "../components/media-queries"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Spectral, serif;
    margin: 0;
    font-weight: 300;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Spectral SC', serif;
    font-weight: 500;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;

  @media (min-width: 750px) {
    grid-template-columns: 30vw 70vw;
    grid-template-rows: auto;
  }
`

const NavContainer = styled.div`
  grid-column: 1;
  grid-row: 1;

  @media (min-width: 750px) {
    grid-column: 1 / 2;
  }
`

const ContentContainer = styled.div`
  grid-column: 1;
  grid-row: 2;

  @media (min-width: 750px) {
    grid-column: 2;
    grid-row: 1;
    padding: 2vw;
  }
`

const duration = 0.5

const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: duration,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration },
  },
}

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      prismicHomepage {
        data {
          title {
            text
          }
          bio {
            text
          }
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Grid>
        <NavContainer>
          <Nav
            siteTitle={data.prismicHomepage.data.title.text}
            bio={data.prismicHomepage.data.bio.text}
            location={location}
          />
        </NavContainer>
        <AnimatePresence>
          <motion.main
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <ContentContainer>{children}</ContentContainer>
          </motion.main>
        </AnimatePresence>
      </Grid>
      <footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://glitterbox.nz">Glitterbox Pursuits</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
