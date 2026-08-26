import { useState, useRef, useEffect, useCallback } from 'react';

const commands = {
  help: {
    description: 'Show available commands',
    usage: 'help [command]',
    execute: (args, terminal) => {
      if (args[0] && commands[args[0]]) {
        const cmd = commands[args[0]];
        terminal.addOutput(`<span class="cmd-name">${args[0]}</span> - ${cmd.description}`);
        terminal.addOutput(`Usage: ${cmd.usage}`);
        return;
      }
      terminal.addOutput('Available commands:');
      Object.entries(commands).forEach(([name, cmd]) => {
        terminal.addOutput(`  <span class="cmd-name">${name.padEnd(12)}</span> ${cmd.description}`);
      });
      terminal.addOutput('\nType <span class="cmd-name">help <command></span> for details.');
    }
  },
  about: {
    description: 'Show information about ACM IIT Mandi',
    usage: 'about',
    execute: (_, terminal) => {
      terminal.addOutput('<span class="cmd-name">ACM IIT Mandi</span> - Student Chapter');
      terminal.addOutput('Association for Computing Machinery');
      terminal.addOutput('');
      terminal.addOutput('Advancing computing as a science and profession.');
      terminal.addOutput('');
      terminal.addOutput('Established to foster innovation, learning, and');
      terminal.addOutput('community among computing enthusiasts at IIT Mandi.');
    }
  },
  events: {
    description: 'List upcoming events',
    usage: 'events',
    execute: (_, terminal) => {
      terminal.addOutput('Upcoming Events:');
      terminal.addOutput('  <span class="cmd-date">[Oct 15]</span> <span class="cmd-name">Hackathon 2024</span> - 24hr coding challenge');
      terminal.addOutput('  <span class="cmd-date">[Nov 03]</span> <span class="cmd-name">Tech Talk: AI/ML</span> - Industry expert session');
      terminal.addOutput('  <span class="cmd-date">[Nov 20]</span> <span class="cmd-name">Workshop: Web Dev</span> - React & Node.js');
      terminal.addOutput('  <span class="cmd-date">[Dec 01]</span> <span class="cmd-name">Code Golf</span> - Shortest code wins');
    }
  },
  team: {
    description: 'Show core team members',
    usage: 'team',
    execute: (_, terminal) => {
      terminal.addOutput('Core Team 2024:');
      terminal.addOutput('  <span class="cmd-name">Chair</span>        - Alex Kumar');
      terminal.addOutput('  <span class="cmd-name">Vice Chair</span>    - Priya Sharma');
      terminal.addOutput('  <span class="cmd-name">Tech Lead</span>     - Rahul Singh');
      terminal.addOutput('  <span class="cmd-name">Design Lead</span>   - Ananya Patel');
      terminal.addOutput('  <span class="cmd-name">Events Lead</span>   - Vikram Joshi');
      terminal.addOutput('  <span class="cmd-name">Outreach Lead</span> - Sneha Reddy');
    }
  },
  contact: {
    description: 'Show contact information',
    usage: 'contact',
    execute: (_, terminal) => {
      terminal.addOutput('Contact Information:');
      terminal.addOutput('  <span class="cmd-name">Email</span>    - acm@iitmandi.ac.in');
      terminal.addOutput('  <span class="cmd-name">LinkedIn</span> - linkedin.com/company/acm-iit-mandi');
      terminal.addOutput('  <span class="cmd-name">Instagram</span> - @acm_iitmandi');
      terminal.addOutput('  <span class="cmd-name">GitHub</span>   - github.com/acm-iitmandi');
      terminal.addOutput('  <span class="cmd-name">Discord</span>  - discord.gg/acm-iitmandi');
    }
  },
  clear: {
    description: 'Clear the terminal',
    usage: 'clear',
    execute: (_, terminal) => {
      terminal.clear();
    }
  },
  echo: {
    description: 'Print text to terminal',
    usage: 'echo <text>',
    execute: (args, terminal) => {
      terminal.addOutput(args.join(' '));
    }
  },
  date: {
    description: 'Show current date and time',
    usage: 'date',
    execute: (_, terminal) => {
      terminal.addOutput(new Date().toString());
    }
  },
  whoami: {
    description: 'Show current user',
    usage: 'whoami',
    execute: (_, terminal) => {
      terminal.addOutput('visitor@acm-iitmandi:~$');
    }
  },
  neofetch: {
    description: 'Show system info (ASCII art)',
    usage: 'neofetch',
    execute: (_, terminal) => {
      terminal.addOutput(`
   █████████     █████████  ██████   ██████
  ███░░░░░███   ███░░░░░███░░██████ ██████ 
 ░███    ░███  ███     ░░░  ░███░█████░███ 
 ░███████████ ░███          ░███░░███ ░███ 
 ░███░░░░░███ ░███          ░███ ░░░  ░███ 
 ░███    ░███ ░░███     ███ ░███      ░███ 
 █████   █████ ░░█████████  █████     █████
░░░░░   ░░░░░   ░░░░░░░░░  ░░░░░     ░░░░░ 

      ACM IIT MANDI Student Chapter
      ---
      OS: Linux (Web Browser)
      Shell: ACM Terminal v1.0
      Uptime: ${Math.floor(Math.random() * 100)} days
      Packages: ${42 + Math.floor(Math.random() * 20)}
      `);
    }
  }
};

const initialOutput = [
  { html: 'Welcome to <span class="cmd-name">ACM IIT Mandi</span> Terminal v1.0', className: '', id: 1 },
  { html: 'Type <span class="cmd-name">help</span> to see available commands.', className: '', id: 2 },
  { html: 'Type <span class="cmd-name">neofetch</span> for system info.', className: '', id: 3 },
];

const Terminal = () => {
  const [output, setOutput] = useState(initialOutput);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [minimized, setMinimized] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const addOutput = useCallback((html, className = '') => {
    setOutput(prev => [...prev, { html, className, id: Date.now() + Math.random() }]);
  }, []);

  const clear = useCallback(() => {
    setOutput([]);
  }, []);

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setOutput(prev => [...prev, { html: `<span class="prompt">visitor@acm-iitmandi:~$</span> ${trimmed}`, className: 'input-line', id: Date.now() }]);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[command]) {
      try {
        commands[command].execute(args, { addOutput, clear });
      } catch (e) {
        addOutput(`Error executing command: ${e.message}`, 'error');
      }
    } else {
      addOutput(`Command not found: <span class="error">${command}</span>. Type <span class="cmd-name">help</span> for available commands.`, 'error');
    }

    setHistory(prev => [...prev, trimmed].slice(-50));
    setHistoryIndex(-1);
    setInput('');
  }, [addOutput, clear]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.trim().split(' ');
      if (parts.length === 1) {
        const matches = Object.keys(commands).filter(c => c.startsWith(parts[0].toLowerCase()));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        } else if (matches.length > 1) {
          addOutput(matches.join('  '));
        }
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [output]);

  const scrollToBottom = () => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  if (minimized) {
    return (
      <div className="terminal terminal-minimized" onClick={toggleMinimize}>
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="control close" onClick={(e) => { e.stopPropagation(); setMinimized(false); }} />
            <span className="control minimize" onClick={toggleMinimize} />
            <span className="control maximize" />
          </div>
          <div className="terminal-title">terminal.acm-iitmandi.ac.in</div>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal" ref={containerRef}>
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control close" onClick={() => setMinimized(true)} />
          <span className="control minimize" onClick={toggleMinimize} />
          <span className="control maximize" />
        </div>
        <div className="terminal-title">terminal.acm-iitmandi.ac.in</div>
      </div>
      <div className="terminal-body">
        <div className="terminal-output">
          {output.map((line) => (
            <div key={line.id} className={`output-line ${line.className || ''}`} dangerouslySetInnerHTML={{ __html: line.html }} />
          ))}
        </div>
        <div className="terminal-input-line">
          <span className="prompt">visitor@acm-iitmandi:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="cursor" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;