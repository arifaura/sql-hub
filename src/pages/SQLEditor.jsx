import { useState, useEffect } from 'react';
import { FaPlay, FaDownload, FaSave, FaCopy, FaDatabase } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import initSqlJs from 'sql.js';

// Sample data for initial databases
const SAMPLE_DATA = {
  // Basic Database - Simple Employee Records
  basic_employee: {
    employees: [
      { id: 1, name: 'John Smith', department: 'IT', salary: 60000 },
      { id: 2, name: 'Mary Johnson', department: 'HR', salary: 55000 },
      { id: 3, name: 'Bob Wilson', department: 'IT', salary: 65000 }
    ]
  },
  
  // Intermediate Database - E-commerce
  ecommerce: {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
    ],
    orders: [
      { id: 1, user_id: 1, product: 'Laptop', amount: 999.99, date: '2024-01-15' },
      { id: 2, user_id: 2, product: 'Phone', amount: 699.99, date: '2024-01-16' },
      { id: 3, user_id: 1, product: 'Headphones', amount: 99.99, date: '2024-01-17' }
    ],
    products: [
      { id: 1, name: 'Laptop', price: 999.99, stock: 50 },
      { id: 2, name: 'Phone', price: 699.99, stock: 100 },
      { id: 3, name: 'Headphones', price: 99.99, stock: 200 }
    ]
  },
  
  // Advanced Database - Library Management
  library: {
    books: [
      { id: 1, title: 'SQL Basics', author_id: 1, genre: 'Education', isbn: '123-456-789', published_year: 2020 },
      { id: 2, title: 'Web Development', author_id: 2, genre: 'Technology', isbn: '234-567-890', published_year: 2021 },
      { id: 3, title: 'Data Science', author_id: 1, genre: 'Education', isbn: '345-678-901', published_year: 2022 }
    ],
    authors: [
      { id: 1, name: 'Alice Brown', country: 'USA', books_written: 10 },
      { id: 2, name: 'Charlie Davis', country: 'UK', books_written: 5 }
    ],
    borrowings: [
      { id: 1, book_id: 1, member_id: 1, borrow_date: '2024-01-01', return_date: '2024-01-15' },
      { id: 2, book_id: 2, member_id: 2, borrow_date: '2024-01-10', return_date: null }
    ],
    members: [
      { id: 1, name: 'David Wilson', membership_type: 'Premium', join_date: '2023-01-01' },
      { id: 2, name: 'Emma Davis', membership_type: 'Standard', join_date: '2023-06-15' }
    ]
  }
};

function SQLEditor() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [selectedDatabase, setSelectedDatabase] = useState('sample_db');
  const [isExecuting, setIsExecuting] = useState(false);
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);

  // Initialize SQL.js and create sample database
  useEffect(() => {
    const initDB = async () => {
      try {
        // Initialize SQL.js
        const SQL = await initSqlJs({
          locateFile: file => `https://sql.js.org/dist/${file}`
        });

        // Create a new database
        const db = new SQL.Database();

        // Basic Employee Database
        db.run(`
          CREATE TABLE employees (
            id INTEGER PRIMARY KEY,
            name TEXT,
            department TEXT,
            salary INTEGER
          );
        `);
        SAMPLE_DATA.basic_employee.employees.forEach(emp => {
          db.run('INSERT INTO employees VALUES (?, ?, ?, ?)', 
            [emp.id, emp.name, emp.department, emp.salary]);
        });

        // E-commerce Database
        db.run(`
          CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER);
          CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product TEXT, amount REAL, date TEXT);
          CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER);
        `);
        SAMPLE_DATA.ecommerce.users.forEach(user => {
          db.run('INSERT INTO users VALUES (?, ?, ?, ?)', [user.id, user.name, user.email, user.age]);
        });
        SAMPLE_DATA.ecommerce.orders.forEach(order => {
          db.run('INSERT INTO orders VALUES (?, ?, ?, ?, ?)', 
            [order.id, order.user_id, order.product, order.amount, order.date]);
        });
        SAMPLE_DATA.ecommerce.products.forEach(product => {
          db.run('INSERT INTO products VALUES (?, ?, ?, ?)', 
            [product.id, product.name, product.price, product.stock]);
        });

        // Library Management Database
        db.run(`
          CREATE TABLE books (
            id INTEGER PRIMARY KEY,
            title TEXT,
            author_id INTEGER,
            genre TEXT,
            isbn TEXT,
            published_year INTEGER
          );
          CREATE TABLE authors (
            id INTEGER PRIMARY KEY,
            name TEXT,
            country TEXT,
            books_written INTEGER
          );
          CREATE TABLE borrowings (
            id INTEGER PRIMARY KEY,
            book_id INTEGER,
            member_id INTEGER,
            borrow_date TEXT,
            return_date TEXT
          );
          CREATE TABLE members (
            id INTEGER PRIMARY KEY,
            name TEXT,
            membership_type TEXT,
            join_date TEXT
          );
        `);
        SAMPLE_DATA.library.books.forEach(book => {
          db.run('INSERT INTO books VALUES (?, ?, ?, ?, ?, ?)',
            [book.id, book.title, book.author_id, book.genre, book.isbn, book.published_year]);
        });
        SAMPLE_DATA.library.authors.forEach(author => {
          db.run('INSERT INTO authors VALUES (?, ?, ?, ?)',
            [author.id, author.name, author.country, author.books_written]);
        });
        SAMPLE_DATA.library.borrowings.forEach(borrowing => {
          db.run('INSERT INTO borrowings VALUES (?, ?, ?, ?, ?)',
            [borrowing.id, borrowing.book_id, borrowing.member_id, borrowing.borrow_date, borrowing.return_date]);
        });
        SAMPLE_DATA.library.members.forEach(member => {
          db.run('INSERT INTO members VALUES (?, ?, ?, ?)',
            [member.id, member.name, member.membership_type, member.join_date]);
        });

        setDb(db);
        toast.success('Databases initialized successfully');
      } catch (err) {
        console.error('Failed to initialize database:', err);
        toast.error('Failed to initialize database');
        setError(err.message);
      }
    };

    initDB();

    // Cleanup function
    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  const handleExecuteQuery = async () => {
    if (!query.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }

    if (!db) {
      toast.error('Database not initialized');
      return;
    }

    setIsExecuting(true);
    setError(null);

    try {
      // Execute the query
      const result = db.exec(query);
      
      if (result.length > 0) {
        setResults({
          columns: result[0].columns,
          rows: result[0].values.map(row => 
            Object.fromEntries(row.map((value, index) => [result[0].columns[index], value]))
          )
        });
      } else {
        // Handle queries that don't return results (INSERT, UPDATE, etc.)
        setResults(null);
        toast.success('Query executed successfully');
      }
    } catch (err) {
      console.error('Query execution error:', err);
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(query);
    toast.success('Query copied to clipboard');
  };

  const downloadResults = () => {
    if (!results) return;

    const csv = [
      results.columns.join(','),
      ...results.rows.map(row => results.columns.map(col => row[col]).join(','))
    ].join('\\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Results downloaded as CSV');
  };

  // Sample databases with their tables
  const availableDatabases = [
    {
      id: 'basic_employee',
      name: 'Basic Employee Database',
      description: 'Simple database for learning basic SQL queries',
      difficulty: 'Beginner',
      tables: [
        {
          name: 'employees',
          columns: ['id', 'name', 'department', 'salary']
        }
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Database',
      description: 'Intermediate database with multiple related tables',
      difficulty: 'Intermediate',
      tables: [
        {
          name: 'users',
          columns: ['id', 'name', 'email', 'age']
        },
        {
          name: 'orders',
          columns: ['id', 'user_id', 'product', 'amount', 'date']
        },
        {
          name: 'products',
          columns: ['id', 'name', 'price', 'stock']
        }
      ]
    },
    {
      id: 'library',
      name: 'Library Management Database',
      description: 'Advanced database with complex relationships',
      difficulty: 'Advanced',
      tables: [
        {
          name: 'books',
          columns: ['id', 'title', 'author_id', 'genre', 'isbn', 'published_year']
        },
        {
          name: 'authors',
          columns: ['id', 'name', 'country', 'books_written']
        },
        {
          name: 'borrowings',
          columns: ['id', 'book_id', 'member_id', 'borrow_date', 'return_date']
        },
        {
          name: 'members',
          columns: ['id', 'name', 'membership_type', 'join_date']
        }
      ]
    }
  ];

  const insertSampleQuery = (tableName) => {
    const table = availableDatabases[0].tables.find(t => t.name === tableName);
    if (table) {
      setQuery(`SELECT * FROM ${tableName};`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SQL Editor</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Practice SQL queries with databases of varying complexity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Database Explorer */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FaDatabase className="mr-2" /> Database Explorer
            </h2>
            <div className="space-y-6">
              {availableDatabases.map(db => (
                <div key={db.id} className="space-y-2">
                  <div className="font-medium text-gray-900 dark:text-white flex items-center justify-between">
                    <span>{db.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      db.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      db.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {db.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{db.description}</p>
                  <div className="pl-4 space-y-1">
                    {db.tables.map(table => (
                      <div key={table.name} className="space-y-1">
                        <button
                          onClick={() => insertSampleQuery(table.name)}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer px-2 py-1 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          {table.name}
                        </button>
                        <div className="pl-4 text-xs text-gray-500 dark:text-gray-400">
                          {table.columns.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor and Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Query Editor */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Query Editor</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={copyQuery}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Copy Query"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => {/* TODO: Implement save query */}}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Save Query"
                  >
                    <FaSave />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your SQL query here..."
                />
                <div className="mt-4 flex justify-between items-center">
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                  <div className="flex-1" />
                  <button
                    onClick={handleExecuteQuery}
                    disabled={isExecuting || !db}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    <FaPlay className="mr-2" />
                    {isExecuting ? 'Executing...' : 'Execute Query'}
                  </button>
                </div>
              </div>
            </div>

            {/* Query Results */}
            {results && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Results</h2>
                  <button
                    onClick={downloadResults}
                    className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FaDownload className="mr-2" />
                    Download CSV
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        {results.columns.map(column => (
                          <th
                            key={column}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {results.rows.map((row, i) => (
                        <tr key={i}>
                          {results.columns.map(column => (
                            <td
                              key={column}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                            >
                              {row[column]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SQLEditor; 