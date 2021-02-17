import React, { useState, useRef } from 'react';
import arabJs from "./arabJs/index";
import CodeSnippets from "./CodeSnippets";
import Editor from "./Editor";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import JsConsole from "./JsConsole"
import EditorNext from "./EditorNext"
import "./App.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "green",
    color: "white",
    '&:hover': {
      color: "black",
      backgroundColor: "green",
    },
  },

}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
export default function App() {

  const classes = useStyles();

  const [code, setCode] = useState(  `
  // ترتيب الدول حسب نسبة الوفاة استناداً
  //على الاصابة بفيروس كورونا المستجد  
  لنفرض الرابط = "https://covid19-api.com/country/all?format=json"
  
  لنفرض حمل_المعلومات = (الرابط) => حمل(الرابط).ثم(البيانات => البيانات.الى_جيسون())
  
  لنفرض نقح_البيانات = (البيانات) => البيانات.نقح(({ country, confirmed,deaths}) 
      =>
    ({
      الدولة: country,
      نسبة_الوفاة: deaths / confirmed * 100
    }))
  
  لنفرض صفي_البيانات = (البيانات) => البيانات.صفي(({نسبة_الوفاة})
   => !رقمي(نسبة_الوفاة))
  
  لنفرض رتب_الدول = (الدول) => الدول.رتب((الاصغر, الاكبر) => الاصغر.نسبة_الوفاة - الاكبر.نسبة_الوفاة)
  
  لنفرض الدول_العربية = (الدول) => الدول.صفي(({الدولة}) 
  => ["Yemen", "Tunisia", "Syria", "Morocco", "Libya", "Lebanon", "Jordan",
    "Iraq", "Sudan", "Algeria", "Egypt", "Saudi Arabia", "Qatar", "UAE",
    "Bahrain", "Kuwait", "Oman"
  ].يحتوي(الدولة))
  لنفرض d3 = مجهول
  
  استورد("https://unpkg.com/d3?module")
    .ثم(المكتبة => d3 = المكتبة)
    .ثم(_ => حمل_المعلومات(الرابط))
    .ثم(نقح_البيانات)
    .ثم(صفي_البيانات)
    .ثم(رتب_الدول)
    .ثم(الدول_العربية)
    .ثم(الدول => نمذج_البيانات(الدول))
    .فشل(الخطأ => اطبع.خلل(الخطأ))
  
  // D3 code in JS
  
  لنفرض نمذج_البيانات = (الدول) => {
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
    x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);
    y = d3.scaleLinear()
      .range([height, 0]);
  
    d3.select(".myChart").html("");
    svg = d3.select(".myChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  
    x.domain(الدول.map((d) => d.الدولة));
    y.domain([0, d3.max(الدول, (d) => d.نسبة_الوفاة)]);
  
    svg.selectAll(".bar")
      .data(الدول)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.الدولة))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.نسبة_الوفاة))
      .attr("height", (d) => height - y(d.نسبة_الوفاة));
  
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("x", -10)
      .style("text-anchor", "start");
  }
 `);
  const [JScode, changeJscode] = useState(`console.log("اهلاً بالعالم")`);

  const [target, setTarget] = useState("console");
  const editorRef = useRef(null);
  const [loadingText, setLoadingText] = useState("");
  const [isJScode, changeisJscode] = useState(false);
  const execute = (code) => {
    if (target === "console") {
      console.log(arabJs.run(code));
      setLoadingText("")

    }
    else if (target === "DOM") {
      arabJs.run(code);
      setLoadingText("أنتظر قليلأ...")

    }
  }
  const runCode = () => {
    const finalCode = editorRef.current.editor.getValue();
    execute(finalCode);
  }
  const targetRender = () => {
    const dom = target === "console" ? <JsConsole> </JsConsole> :
      <div className="myChart" width="400" height="400"> {loadingText}
      </div>;
    return dom;
  }
  return (
    <div className="App">
      <h1>عرب.جس</h1>
      <h2>برمج جافا سكربت باللغة العربية</h2>
      <CodeSnippets onCodeChange={(code, target) => { setCode(code); setTarget(target) }}></CodeSnippets>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<PlayArrow />}
        onClick={runCode}
      >
        نفذ البرنامج
      </Button>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>JS</Grid>
          <Grid item>
            <AntSwitch checked={isJScode} onChange={() => {
              changeisJscode(!isJScode); 
              if(!isJScode)
              changeJscode(`console.log("Hello from the other side")`)
              // changeJscode(arabJs.transpile(editorRef.current.editor.getValue()))

            }
            } name="checkedC" />
          </Grid>
          <Grid item>ArabJS</Grid>
        </Grid>
      </Typography>
      {!isJScode ?
        <EditorNext code={code} editorRef={editorRef} direction={"rtl"} rtlMoveVisually={true} readOnly= {false} ></EditorNext> :
        <EditorNext code={JScode} editorRef={editorRef} direction={"ltr"} rtlMoveVisually={false} readOnly= {true} ></EditorNext>
      }
      <br />
      {targetRender()}

    </div>

  );
}
