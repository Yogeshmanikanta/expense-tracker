import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { Trash2, PlusCircle, Wallet, TrendingUp, ShoppingBag, BarChart2 } from "lucide-react";

const CATEGORIES = ["Food", "Transport", "Entertainment", "Shopping", "Health", "Other"];
const COLORS = ["#1D9E75", "#378ADD", "#534AB7", "#D85A30", "#D4537E", "#888780"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Swiggy dinner", amount: 340, category: "Food", date: "2026-05-02" },
      { id: 2, name: "Netflix", amount: 649, category: "Entertainment", date: "2026-05-01" },
      { id: 3, name: "Bus pass", amount: 500, category: "Transport", date: "2026-04-30" },
      { id: 4, name: "Groceries", amount: 1200, category: "Food", date: "2026-04-28" },
    ];
  });

  const [budget, setBudget] = useState(() => Number(localStorage.getItem("budget")) || 20000);
  const [form, setForm] = useState({ name: "", amount: "", category: "Food", date: "" });
  const [filterCat, setFilterCat] = useState("All");
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetLeft = budget - totalSpent;
  const budgetPercent = Math.min((totalSpent / budget) * 100, 100);

  const addExpense = () => {
    if (!form.name || !form.amount || !form.date) return alert("Fill all fields!");
    setExpenses([...expenses, { ...form, id: Date.now(), amount: Number(form.amount) }]);
    setForm({ name: "", amount: "", category: "Food", date: "" });
  };

  const deleteExpense = (id) => setExpenses(expenses.filter((e) => e.id !== id));

  const filtered = filterCat === "All" ? expenses : expenses.filter((e) => e.category === filterCat);

  const pieData = CATEGORIES.map((cat, i) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).filter((d) => d.value > 0);

  const barData = MONTHS.map((m, i) => ({
    month: m,
    spent: expenses
      .filter((e) => new Date(e.date).getMonth() === i)
      .reduce((s, e) => s + e.amount, 0),
  }));

  const styles = {
    app: { fontFamily: "'Segoe UI', sans-serif", maxWidth: 900, margin: "0 auto", padding: "1rem", background: "#f8f9fa", minHeight: "100vh" },
    header: { background: "#1a1a2e", color: "white", padding: "1.2rem 1.5rem", borderRadius: 12, marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" },
    tabs: { display: "flex", gap: 8, marginBottom: "1rem" },
    tab: (active) => ({ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 500, fontSize: 14, background: active ? "#1a1a2e" : "white", color: active ? "white" : "#555", transition: "all 0.2s" }),
    card: { background: "white", borderRadius: 12, padding: "1.2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: "1rem" },
    statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: "1rem" },
    stat: (color) => ({ background: color || "#f0f4ff", borderRadius: 10, padding: "1rem", textAlign: "center" }),
    statNum: { fontSize: 24, fontWeight: 700, margin: "4px 0 0" },
    input: { padding: "8px 12px", borderRadius: 8, border: "1px solid #e0e0e0", fontSize: 14, width: "100%", boxSizing: "border-box" },
    btn: { padding: "10px 20px", background: "#1a1a2e", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 },
    tag: (cat) => {
      const colors = { Food: "#e8f5e9", Transport: "#e3f2fd", Entertainment: "#ede7f6", Shopping: "#fbe9e7", Health: "#fce4ec", Other: "#f5f5f5" };
      const text = { Food: "#2e7d32", Transport: "#1565c0", Entertainment: "#4527a0", Shopping: "#bf360c", Health: "#880e4f", Other: "#424242" };
      return { background: colors[cat] || "#f5f5f5", color: text[cat] || "#333", padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 500 };
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>💸 ExpenseTracker</h1>
          <p style={{ margin: 0, opacity: 0.6, fontSize: 13 }}>Personal Finance Dashboard</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>Monthly Budget</p>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ ...styles.input, width: 120, textAlign: "right", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
          />
        </div>
      </div>

      <div style={styles.tabs}>
        {[["dashboard", "Dashboard"], ["add", "Add Expense"], ["history", "History"], ["charts", "Charts"]].map(([key, label]) => (
          <button key={key} style={styles.tab(activeTab === key)} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <>
          <div style={styles.statGrid}>
            <div style={styles.stat("#fde8e8")}>
              <p style={{ margin: 0, fontSize: 12, color: "#c62828" }}>Total Spent</p>
              <p style={{ ...styles.statNum, color: "#c62828" }}>₹{totalSpent.toLocaleString()}</p>
            </div>
            <div style={styles.stat("#e8f5e9")}>
              <p style={{ margin: 0, fontSize: 12, color: "#2e7d32" }}>Budget Left</p>
              <p style={{ ...styles.statNum, color: budgetLeft < 0 ? "#c62828" : "#2e7d32" }}>₹{budgetLeft.toLocaleString()}</p>
            </div>
            <div style={styles.stat("#e3f2fd")}>
              <p style={{ margin: 0, fontSize: 12, color: "#1565c0" }}>Transactions</p>
              <p style={{ ...styles.statNum, color: "#1565c0" }}>{expenses.length}</p>
            </div>
            <div style={styles.stat("#ede7f6")}>
              <p style={{ margin: 0, fontSize: 12, color: "#4527a0" }}>Avg/Transaction</p>
              <p style={{ ...styles.statNum, color: "#4527a0" }}>₹{expenses.length ? Math.round(totalSpent / expenses.length).toLocaleString() : 0}</p>
            </div>
          </div>

          <div style={styles.card}>
            <p style={{ margin: "0 0 8px", fontWeight: 600 }}>Budget Usage</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "#777" }}>
              <span>₹{totalSpent.toLocaleString()} spent</span>
              <span>{Math.round(budgetPercent)}%</span>
            </div>
            <div style={{ background: "#f0f0f0", borderRadius: 99, height: 10 }}>
              <div style={{ width: `${budgetPercent}%`, background: budgetPercent > 90 ? "#e53935" : budgetPercent > 70 ? "#fb8c00" : "#43a047", borderRadius: 99, height: 10, transition: "width 0.5s" }} />
            </div>
          </div>

          <div style={styles.card}>
            <p style={{ margin: "0 0 12px", fontWeight: 600 }}>Recent Expenses</p>
            {expenses.slice(-5).reverse().map((e) => (
              <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{e.name}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{e.date}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={styles.tag(e.category)}>{e.category}</span>
                  <span style={{ fontWeight: 600, color: "#c62828" }}>-₹{e.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "add" && (
        <div style={styles.card}>
          <p style={{ margin: "0 0 1rem", fontWeight: 600, fontSize: 16 }}>Add New Expense</p>
          <div style={{ display: "grid", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>Expense Name</label>
              <input style={styles.input} placeholder="e.g. Swiggy, Auto, Netflix" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>Amount (₹)</label>
              <input style={styles.input} type="number" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>Category</label>
              <select style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>Date</label>
              <input style={styles.input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <button style={styles.btn} onClick={addExpense}>+ Add Expense</button>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div style={styles.card}>
          <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap" }}>
            {["All", ...CATEGORIES].map((cat) => (
              <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "4px 14px", borderRadius: 99, border: "1px solid #e0e0e0", cursor: "pointer", fontSize: 13, background: filterCat === cat ? "#1a1a2e" : "white", color: filterCat === cat ? "white" : "#555" }}>{cat}</button>
            ))}
          </div>
          {filtered.length === 0 && <p style={{ color: "#999", textAlign: "center" }}>No expenses found.</p>}
          {filtered.map((e) => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>{e.name}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{e.date} • <span style={styles.tag(e.category)}>{e.category}</span></p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontWeight: 600, color: "#c62828" }}>₹{e.amount.toLocaleString()}</span>
                <button onClick={() => deleteExpense(e.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#e53935", fontSize: 16 }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "charts" && (
        <>
          <div style={styles.card}>
            <p style={{ fontWeight: 600, marginBottom: 12 }}>Spending by Category</p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={styles.card}>
            <p style={{ fontWeight: 600, marginBottom: 12 }}>Monthly Spending Trend</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />
                <Bar dataKey="spent" fill="#1a1a2e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default App;