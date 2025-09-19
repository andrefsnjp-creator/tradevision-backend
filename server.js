const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TradeVision AI FREE Backend running!',
    version: '1.0.0-simple'
  });
});

// Análise YouTube simplificada
app.post('/analyze-youtube-free', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Análise mockada para validação
    const report = {
      summary: {
        totalTrades: 3,
        winRate: 66.7,
        totalPips: 45,
        biggestWin: 40,
        biggestLoss: -15,
        tradingPlatform: "MetaTrader 4",
        mainPairs: ["EURUSD", "GBPUSD"]
      },
      trades: [
        {
          id: 1,
          timestamp: "02:15",
          pair: "EURUSD",
          type: "LONG",
          entry: 1.0850,
          exit: 1.0890,
          pips: 40,
          justification: "Rompimento da resistência com confirmação de volume",
          result: "WIN"
        },
        {
          id: 2,
          timestamp: "05:30",
          pair: "GBPUSD",
          type: "SHORT",
          entry: 1.2450,
          exit: 1.2430,
          pips: 20,
          justification: "Rejeição clara na resistência, setup de reversão",
          result: "WIN"
        },
        {
          id: 3,
          timestamp: "08:45",
          pair: "EURUSD",
          type: "LONG",
          entry: 1.0920,
          exit: 1.0905,
          pips: -15,
          justification: "Stop loss acionado após mudança do cenário",
          result: "LOSS"
        }
      ],
      insights: [
        "Excelente disciplina com gerenciamento de risco",
        "Análise técnica consistente nos pontos de entrada",
        "Saídas rápidas quando setup não confirma"
      ],
      riskManagement: {
        stopLossUsed: true,
        positionSizing: "Consistente, cerca de 1-2% por operação",
        riskRewardRatio: "Média de 1:2, relação favorável"
      }
    };

    res.json({
      success: true,
      report,
      metadata: {
        version: 'FREE-SIMPLE',
        processing_time: 'Instantâneo',
        video_url: url
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TradeVision AI Backend running on port ${PORT}`);
});
