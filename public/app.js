"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Create component classes to display features on a page
var MainApp = function (_React$Component) {
    _inherits(MainApp, _React$Component);

    function MainApp(props) {
        _classCallCheck(this, MainApp);

        var _this = _possibleConstructorReturn(this, (MainApp.__proto__ || Object.getPrototypeOf(MainApp)).call(this, props));

        _this.state = {
            items: [],
            chartInfo: {}
        };
        _this.handleGraphicsUpdate = _this.handleGraphicsUpdate.bind(_this);
        return _this;
    }

    _createClass(MainApp, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(SideWidget, { onChartUpdate: this.handleGraphicsUpdate })
            );
        }

        // e = {startDate: , endDate: , selStock: }

    }, {
        key: "handleGraphicsUpdate",
        value: function handleGraphicsUpdate(e) {
            var _this2 = this;

            this.setState({ chartInfo: e });
            fetch("http://api.fixer.io/2017-11-02").then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "No Data";
                }
            }).then(function (json) {
                var newItems = [];
                for (var item in json.rates) {
                    newItems.push(item + " -> " + json.rates[item]);
                }
                _this2.setState({ items: newItems });
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }]);

    return MainApp;
}(React.Component);

var SideWidget = function (_React$Component2) {
    _inherits(SideWidget, _React$Component2);

    function SideWidget(props) {
        _classCallCheck(this, SideWidget);

        var _this3 = _possibleConstructorReturn(this, (SideWidget.__proto__ || Object.getPrototypeOf(SideWidget)).call(this, props));

        _this3.state = {
            items: [],
            startDate: '',
            endDate: '',
            text: '',
            rates: {},
            selStock: ''
            // Need to bind handlers to the enclosing object "this"
        };_this3.handleSubmit = _this3.handleSubmit.bind(_this3);
        _this3.handleStartDateChange = _this3.handleStartDateChange.bind(_this3);
        _this3.handleEndDateChange = _this3.handleEndDateChange.bind(_this3);
        _this3.handleSelectStock = _this3.handleSelectStock.bind(_this3);
        _this3.handleChartUpdate = _this3.handleChartUpdate.bind(_this3);
        _this3.handleTextBox = _this3.handleTextBox.bind(_this3);
        return _this3;
    }

    // calls the callback for the parent of SideWidget


    _createClass(SideWidget, [{
        key: "handleChartUpdate",
        value: function handleChartUpdate(e) {
            this.props.onChartUpdate({
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                selStock: this.state.selStock
            });
        }

        // callback for the select stock in StockList

    }, {
        key: "handleSelectStock",
        value: function handleSelectStock(e) {
            this.setState({ selStock: e });
        }

        // render the sidebar html

    }, {
        key: "render",
        value: function render() {
            //const selStock = this.state.selStock
            //const chartInfo = this.props.chartInfo;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    " Options",
                    React.createElement(
                        "div",
                        null,
                        "Start Date",
                        React.createElement(DatePicker, {
                            currentDate: this.state.startDate,
                            dateChange: this.handleStartDateChange
                        })
                    ),
                    React.createElement(
                        "div",
                        null,
                        "End Date",
                        React.createElement(DatePicker, {
                            currentDate: this.state.endDate,
                            dateChange: this.handleEndDateChange
                        })
                    )
                ),
                React.createElement(
                    "button",
                    { onClick: this.handleChartUpdate },
                    "Press me to show the Visual"
                ),
                React.createElement(StockList, {
                    onSelectStock: this.handleSelectStock,
                    items: this.state.items,
                    rates: this.state.rates
                }),
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement("input", {
                        onChange: this.handleTextBox,
                        value: this.state.text
                    }),
                    React.createElement(
                        "button",
                        null,
                        "Add to Watchlist"
                    )
                )
            );
        }
    }, {
        key: "handleTextBox",
        value: function handleTextBox(e) {
            this.setState({ text: e.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(e) {
            e.preventDefault();
            if (!this.state.text.length) {
                return;
            }
            var newItem = {
                text: this.state.text,
                id: Date.now(),
                rate: this.state.rates[this.state.text]
            };
            this.setState(function (prevState) {
                return {
                    items: prevState.items.concat(newItem),
                    text: ''
                };
            });
        }
    }, {
        key: "handleStartDateChange",
        value: function handleStartDateChange(e) {
            this.setState({ startDate: e.target.value });
        }
    }, {
        key: "handleEndDateChange",
        value: function handleEndDateChange(e) {
            this.setState({ endDate: e.target.value });
        }
    }]);

    return SideWidget;
}(React.Component);

var DatePicker = function (_React$Component3) {
    _inherits(DatePicker, _React$Component3);

    function DatePicker() {
        _classCallCheck(this, DatePicker);

        return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).apply(this, arguments));
    }

    _createClass(DatePicker, [{
        key: "render",
        value: function render() {
            return React.createElement("input", {
                value: this.props.currentDate,
                onChange: this.props.dateChange
            });
        }
    }]);

    return DatePicker;
}(React.Component);

// Make sure you can explain how the map works.


var StockList = function (_React$Component4) {
    _inherits(StockList, _React$Component4);

    function StockList(props) {
        _classCallCheck(this, StockList);

        var _this5 = _possibleConstructorReturn(this, (StockList.__proto__ || Object.getPrototypeOf(StockList)).call(this, props));

        _this5.handleClick = _this5.handleClick.bind(_this5);
        return _this5;
    }

    _createClass(StockList, [{
        key: "handleClick",
        value: function handleClick(e) {
            this.props.onSelectStock(e.target.text);
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "ul",
                null,
                this.props.items.map(function (item) {
                    return React.createElement(Item, { onClick: _this6.handleClick, key: item.id, text: item.text, price: _this6.props.rates[item.text] });
                })
            );
        }
    }]);

    return StockList;
}(React.Component);

// Can you list Item's props?

function Item(props) {
    return React.createElement(
        "li",
        null,
        props.text,
        " -> ",
        props.price
    );
}
ReactDOM.render(React.createElement(MainApp, null), document.getElementById('root'));

