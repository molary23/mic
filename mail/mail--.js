const reply = require("./reply"),
  confirm = require("./confirm"),
  editsignal = require("./editsignal"),
  reset = require("./reset"),
  signal = require("./signal"),
  ticket = require("./ticket"),
  verify = require("./verify");

const mail = (
  <html>
    <head> </head>
    <body
      leftmargin="0"
      rightmargin="0"
      topmargin="0"
      marginheight="0"
      style="font-family: \'Georgia\', Helvetica, serif"
    >
      <table
        border="0"
        style="width: 100%; background-color: #ffffff; padding: 0px"
        align="center"
      >
        <tbody>
          <tr>
            <td align="center" style="padding: 0px">
              <table border="0" align="center" style="padding: 0px">
                <tbody>
                  <tr>
                    <td
                      class="horizontal_sapcing"
                      width="12"
                      style="
                      min-width: 12px;
                      padding: 0px;
                      font-size: 0px;
                      line-height: 1px;
                      padding: 0px;
                    "
                    >
                      &nbsp;
                    </td>
                    <td
                      class="horizontal_sapcing"
                      style="
                      padding: 0px;
                      font-size: 0px;
                      line-height: 1px;
                      padding: 0px;
                    "
                    >
                      <table
                        border="0"
                        class="wrapper"
                        style="padding: 0px; width: 448px"
                      >
                        <tbody>
                          <tr>
                            <td align="center" style="padding: 0px">
                              <table
                                border="0"
                                style="min-width: 100%; padding: 0px"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      height="24"
                                      style="height: 24px; padding: 0px"
                                    ></td>
                                  </tr>
                                  <tr>
                                    <td align="center" style="padding: 0px">
                                      <table
                                        border="0"
                                        cellspacing="0"
                                        cellpadding="0"
                                        align="center"
                                        width="100%"
                                        style="min-width: 100%; padding: 0px"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              class="horizontal_sapcing"
                                              style="
                                              padding: 0px;
                                              font-size: 0px;
                                              line-height: 1px;
                                              padding: 0px;
                                            "
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                border="0"
                                                align="left"
                                                style="padding: 0px"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td style="padding: 0px">
                                                      <a href="https://lucipost.com">
                                                        <img
                                                          src="https://lucipost.com/images/lucipost.png"
                                                          height="32"
                                                          class="logoImage"
                                                          style="
                                                          border: none;
                                                          border-radius: 24px;
                                                        "
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                              <table
                                                border="0"
                                                align="right"
                                                style="padding: 0px"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="right"
                                                      valign="top"
                                                      style="
                                                      padding: 0px;
                                                      font-family: Helvetica,
                                                        Arial, sans-serif;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                      color: #31373b;
                                                      padding: 0px;
                                                    "
                                                    >
                                                      <p style="margin-bottom: 2px">
                                                        MIC Earn Business
                                                      </p>
                                                      <p style="margin-top: 2px">
                                                        Company Motto
                                                      </p>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              height="12"
                                              style="height: 12px; padding: 0px"
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          {middlecontent}
                          <tr>
                            <td
                              class="footer_made"
                              style="
                              padding: 0px;
                              font-family: Helvetica, Arial, sans-serif;
                              color: #8899a6;
                              font-size: 12px;
                              padding: 0px;
                              font-weight: normal;
                              line-height: 12px;
                            "
                              align="center"
                            >
                              Connect and Join the Conversation:&nbsp;&nbsp;
                              <a
                                href="https://facebook.com/thelucipost"
                                style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                                target="_blank"
                              >
                                <img
                                  src="https://lucipost.com/images/fb.png"
                                  style="height: 20px"
                                />
                              </a>
                              &nbsp;&nbsp;
                              <a
                                href="https://twitter.com/thelucipost"
                                style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                                target="_blank"
                              >
                                <img
                                  src="https://lucipost.com/images/tw.png"
                                  style="height: 20px"
                                />
                              </a>
                              &nbsp;&nbsp;
                              <a
                                href="https://instagram.com/thelucipost"
                                style="
                                text-decoration: none;
                                font-family: Helvetica, Arial, sans-serif;
                                color: #8899a6;
                                font-size: 12px;
                                padding: 0px;
                                font-weight: normal;
                                line-height: 12px;
                                display: inline-block;
                              "
                                target="_blank"
                              >
                                <img
                                  src="https://lucipost.com/images/ig.png"
                                  style="height: 20px"
                                />
                              </a>
                              &nbsp;&nbsp;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="height: 10px; padding: 0px"
                              height="10"
                            ></td>
                          </tr>
                          <tr>
                            <td style="padding: 0px" align="center">
                              <table
                                style="padding: 0px"
                                width="100%"
                                border="0"
                                align="center"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="horizontal_sapcing"
                                      style="
                                      padding: 0px;
                                      font-size: 0px;
                                      line-height: 1px;
                                      padding: 0px;
                                    "
                                      width="48"
                                    >
                                      &nbsp;
                                    </td>
                                    <td style="padding: 0px" align="center">
                                      <span
                                        class="addressLink"
                                        style="
                                        font-family: Helvetica, Arial,
                                          sans-serif;
                                        font-size: 12px;
                                        padding: 0px;
                                        font-weight: normal;
                                        line-height: 16px;
                                        color: #8899a6 !important;
                                      "
                                      >
                                        Copyright &copy;
                                        <a
                                          href="{website}"
                                          style="
                                          color: #8899a6 !important;
                                          text-decoration: none !important;
                                          text-decoration: none;
                                        "
                                          target="_blank"
                                        >
                                          <strong>MIC</strong>Earn Business
                                        </a>
                                        {date}
                                      </span>
                                    </td>
                                    <td
                                      class="horizontal_sapcing"
                                      style="
                                      padding: 0px;
                                      font-size: 0px;
                                      line-height: 1px;
                                      padding: 0px;
                                    "
                                      width="48"
                                    >
                                      &nbsp;
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
);

module.exports = mail;
