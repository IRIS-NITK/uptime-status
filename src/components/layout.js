/** @jsx jsx */
/* eslint-disable jsx-a11y/no-autofocus, react/jsx-no-target-blank */
import { jsx } from "theme-ui"
import React from "react"
import { Link} from "gatsby"
import { rhythm } from "../utils/typography"
import Logo from "./logo"


class Layout extends React.Component {
  render() {
    const { location, children, description } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
        <div
          sx={{
            py: 1,
            color: "headerText",
            backgroundColor: "headerBackground",
          }}
        >
          {location.pathname === rootPath ? (
            <header
              sx={{
                mx: `auto`,
                maxWidth: rhythm(30),
                fontSize: 3,
                px: [4, 4],
                pt: 4,
                pb: 0,
              }}
            >
              <Logo color="white" size={["36px", "48px"]} />
              <p sx={{ pt: 2, pb: 2, mb: 0, mt: 0, fontSize: [2, 3] }}>
                {description}
              </p>
            </header>
          ) : (
            <header
              sx={{
                marginLeft: `auto`,
                marginRight: `auto`,
                maxWidth: rhythm(30),
                px: [2, 4],
                pt: 4,
                pb: 2,
              }}
            >
              <h3
                sx={{
                  mt: 0,
                  mb: 3,
                }}
              >
                <Link
                  sx={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: `logoColor`,
                    "&:hover": {
                      textDecoration: "none",
                      color: "logoColor",
                    },
                  }}
                  to={`/`}
                >
                  <Logo color="white" size={["36px", "48px"]} />
                </Link>
              </h3>
              {location.pathname === rootPath && <p>{description}</p>}
            </header>
          )}
        </div>
        <div
          style={{
            background: "#F3F5F7",
          }}
        >
          <main
            sx={{
              mx: `auto`,
              maxWidth: rhythm(45),
              px: [2, 4],
              py: [4],
              display: "grid",
              gap: 4,
              gridTemplateColumns: "repeat(2, 1fr)",
              gridAutoRows: "minmax(4,auto)",
            }}
          >
            {children}
          </main>
        </div>
        <footer
          sx={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            textAlign: "center",
            color: "footerTextColor",
            fontSize: 1,
          }}
        >
          <Logo color="currentColor" size="36px" />
          <div sx={{ mt: 2 }}>
            <a
              href="https://iris.nitk.ac.in/hrms"
              target="_blank"
              sx={{
                color: "footerTextColor",
                textDecoration: "underline",
                "&:hover": {
                  color: "footerTextHoverColor",
                },
              }}
            >
              IRIS, NITK
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
